import { Job } from '@/lib/types/job';
import { CalendarDays, MapPin, DollarSign, Star, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {job.status}
          </span>
        </div>

        {/* Rest of the job card content... */}
        {/* Copy the existing job card content from your page component */}
      </div>
    </div>
  );
} 