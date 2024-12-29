'use client';

import { JobFormData } from './page';
import { ArrowLeft } from 'lucide-react';

interface JobPreviewProps {
  jobData: JobFormData;
  onEdit: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function JobPreview({ jobData, onEdit, onSubmit }: JobPreviewProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onEdit}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Edit
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm & Post
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{jobData.title}</h1>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Categories</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {jobData.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-gray-900">{jobData.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pay Rate</h3>
                <p className="mt-1 text-gray-900">{jobData.pay} VND/hour</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                <p className="mt-1 text-gray-900">{jobData.duration} hours</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(jobData.startTime).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                <p className="mt-1 text-gray-900">{jobData.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">{jobData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 