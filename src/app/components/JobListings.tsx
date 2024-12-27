'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Job } from '@/lib/types/job';
import { getJobs } from '@/lib/firebase/firebaseUtils';
import JobFilters, { FilterState } from './JobFilters';
import JobCard from './JobCard';
import { SAMPLE_JOBS } from '@/lib/data/sampleJobs';

const ITEMS_PER_PAGE = 10;

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  // Reference for the last job element
  const lastJobElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchJobs = async () => {
      // In a real app, you would fetch from Firebase
      // const fetchedJobs = await getJobs();
      setJobs(SAMPLE_JOBS);
      setFilteredJobs(SAMPLE_JOBS);
      setDisplayedJobs(SAMPLE_JOBS.slice(0, ITEMS_PER_PAGE));
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newJobs = filteredJobs.slice(0, end);
    
    setDisplayedJobs(newJobs);
    setPage(nextPage);
    setHasMore(newJobs.length < filteredJobs.length);
  };

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
    setDisplayedJobs(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
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
        sorted.sort((a, b) => b.id - a.id);
    }
    setFilteredJobs(sorted);
    setDisplayedJobs(sorted.slice(0, ITEMS_PER_PAGE * page));
  };

  if (loading) {
    return <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
    </div>;
  }

  return (
    <>
      <JobFilters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      
      <div className="space-y-6">
        {displayedJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs found matching your criteria
          </div>
        ) : (
          <>
            {displayedJobs.map((job, index) => (
              <div
                key={job.id}
                ref={index === displayedJobs.length - 1 ? lastJobElementRef : undefined}
              >
                <JobCard job={job} />
              </div>
            ))}
            {loading && <div>Loading more...</div>}
          </>
        )}
      </div>
    </>
  );
} 