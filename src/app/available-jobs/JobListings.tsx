'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/lib/types/job';
import { getJobs } from '@/lib/firebase/firebaseUtils';
import JobFilters, { FilterState } from '../components/JobFilters';
import JobCard from '../components/JobCard';

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
      setFilteredJobs(fetchedJobs);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...jobs];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply task type filter
    if (filters.taskType !== 'All') {
      filtered = filtered.filter(job => job.taskType === filters.taskType);
    }

    // Apply location filter
    if (filters.location !== 'All') {
      filtered = filtered.filter(job => job.location.includes(filters.location));
    }

    // Apply minimum pay filter
    if (filters.minPay) {
      filtered = filtered.filter(job => {
        const jobPay = parseInt(job.pay.replace(/[^0-9]/g, ''));
        return jobPay >= parseInt(filters.minPay);
      });
    }

    setFilteredJobs(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    let sorted = [...filteredJobs];
    switch (sortBy) {
      case 'pay-high':
        sorted.sort((a, b) => {
          const payA = parseInt(a.pay.replace(/[^0-9]/g, ''));
          const payB = parseInt(b.pay.replace(/[^0-9]/g, ''));
          return payB - payA;
        });
        break;
      case 'pay-low':
        sorted.sort((a, b) => {
          const payA = parseInt(a.pay.replace(/[^0-9]/g, ''));
          const payB = parseInt(b.pay.replace(/[^0-9]/g, ''));
          return payA - payB;
        });
        break;
      case 'rating':
        sorted.sort((a, b) => b.worker.rating - a.worker.rating);
        break;
      default:
        // 'newest' is default
        sorted.sort((a, b) => b.id - a.id);
    }
    setFilteredJobs(sorted);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <JobFilters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs found matching your criteria
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </>
  );
} 