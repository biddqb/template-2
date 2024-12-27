import { Suspense } from 'react';
import JobListings from './JobListings';

export default function AvailableJobs() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Tet Jobs</h1>
        <p className="text-gray-600 mb-8">Find the perfect temporary job during Tet holiday season</p>
        
        <Suspense fallback={<div>Loading...</div>}>
          <JobListings />
        </Suspense>
      </div>
    </main>
  );
} 