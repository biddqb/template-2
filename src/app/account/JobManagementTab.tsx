'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

type JobStatus = 'finished' | 'active' | 'cancelled';

interface Job {
  id: number;
  title: string;
  date: Date;
  status: JobStatus;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'House Cleaning',
    date: new Date(2024, 0, 15),
    status: 'finished',
  },
  {
    id: 2,
    title: 'Event Staff',
    date: new Date(2024, 0, 20),
    status: 'active',
  },
  {
    id: 3,
    title: 'Cooking Service',
    date: new Date(2024, 0, 18),
    status: 'cancelled',
  },
];

const statusColors: Record<JobStatus, string> = {
  finished: 'bg-green-100 text-green-800',
  active: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function JobManagementTab() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getJobsForDate = (date: Date) => {
    return mockJobs.filter(
      (job) => format(job.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const jobs = getJobsForDate(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-24 p-2 border ${
                isToday(day) ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="text-right text-sm text-gray-600">
                {format(day, 'd')}
              </div>
              <div className="mt-1 space-y-1">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`text-xs p-1 rounded ${statusColors[job.status]}`}
                  >
                    {job.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 