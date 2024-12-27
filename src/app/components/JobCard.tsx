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

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
              <span>{job.pay}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CalendarDays className="h-5 w-5 mr-2 text-gray-400" />
              <span>{job.availability}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{job.taskType}</span>
            </div>
            <p className="text-gray-600">{job.description}</p>
          </div>

          {/* Worker Profile */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-4">
              <Image
                src={job.worker.photo}
                alt={job.worker.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{job.worker.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {job.worker.rating} ({job.worker.totalReviews} reviews)
                  </span>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Skills:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.worker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            View Details & Apply
          </Link>
        </div>
      </div>
    </div>
  );
} 