import { Suspense } from 'react';
import JobListings from '@/app/components/JobListings';
import Header from '@/app/components/Header';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-4">Tết Job Platform</h1>
              <p className="text-xl text-gray-600">
                Find reliable workers and opportunities during the Lunar New Year season
              </p>
            </div>
            <Header />
          </div>

          <div className="mb-6">
            <Link
              href="/post-job"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post a Job
            </Link>
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
            <JobListings />
          </Suspense>
        </div>
      </main>
    </AuthProvider>
  );
}
