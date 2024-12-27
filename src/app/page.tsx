import { Suspense } from 'react';
import JobListings from '@/app/components/JobListings';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Tết Job Platform</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find reliable workers and opportunities during the Lunar New Year season
        </p>
        
        <Suspense fallback={<div>Loading...</div>}>
          <JobListings />
        </Suspense>
      </div>
    </main>
  );
}
