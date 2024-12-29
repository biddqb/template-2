'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Eye } from 'lucide-react';
import { addJob } from '@/lib/firebase/firebaseUtils';
import JobPreview from './JobPreview';

const INITIAL_CATEGORIES = [
  'Cleaning',
  'Cooking',
  'Decorating',
  'Event Staff',
  'Other'
];

const LOCATIONS = [
  'District 1, Ho Chi Minh City',
  'District 2, Ho Chi Minh City',
  'District 3, Ho Chi Minh City',
  'Ba Dinh, Hanoi',
  'Hoan Kiem, Hanoi',
  'Hai Ba Trung, Hanoi',
  'Hai Chau, Da Nang',
  'Thanh Khe, Da Nang',
];

interface JobFormData {
  title: string;
  categories: string[];
  location: string;
  pay: string;
  duration: string;
  startTime: string;
  description: string;
  email: string;
}

const INITIAL_FORM_DATA: JobFormData = {
  title: '',
  categories: [],
  location: '',
  pay: '',
  duration: '',
  startTime: '',
  description: '',
  email: '',
};

export default function PostJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
    if (value.length > 0) {
      const suggestions = LOCATIONS.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addJob({
        ...formData,
        userId: user.uid,
        userDisplayName: user.displayName,
        userPhotoURL: user.photoURL,
      });
      router.push('/');
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  if (isPreviewMode) {
    return (
      <JobPreview
        jobData={formData}
        onEdit={() => setIsPreviewMode(false)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Categories Multiselect */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_CATEGORIES.map((category) => (
                <label
                  key={category}
                  className={`flex items-center p-3 rounded-md border cursor-pointer ${
                    formData.categories.includes(category)
                      ? 'bg-red-50 border-red-500 text-red-700'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="sr-only"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location with Suggestions */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter job location"
              required
            />
            {locationSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {locationSuggestions.map((location) => (
                  <li
                    key={location}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, location }));
                      setLocationSuggestions([]);
                    }}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pay Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay Rate (VND/hour)
            </label>
            <input
              type="number"
              value={formData.pay}
              onChange={(e) => setFormData({ ...formData, pay: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter pay rate"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter job duration"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Describe the job requirements and details"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter contact email"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 