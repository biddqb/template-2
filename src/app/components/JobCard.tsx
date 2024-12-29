'use client';

import { useState } from 'react';
import { Job } from '@/lib/types/job';
import { CalendarDays, MapPin, DollarSign, Clock } from 'lucide-react';
import JobDetailModal from './JobDetailModal';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [showModal, setShowModal] = useState(false);
  const categories = job.categories || [];
  const startTime = job.startTime ? new Date(job.startTime) : new Date();

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Job Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
              <span>{job.pay} VND/hour</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{job.duration} hours</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CalendarDays className="h-5 w-5 mr-2 text-gray-400" />
              <span>{startTime.toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{job.description}</p>

          {/* Required Skills */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {showModal && (
        <JobDetailModal
          job={job}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
} 