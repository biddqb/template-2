'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sortBy: string) => void;
}

export interface FilterState {
  search: string;
  taskType: string;
  minPay: string;
  location: string;
}

const TASK_TYPES = ['All', 'Cleaning', 'Cooking', 'Decorating', 'Event Staff'];
const LOCATIONS = ['All', 'Ha Noi', 'Ho Chi Minh City', 'Da Nang', 'Other'];

export default function JobFilters({ onFilterChange, onSortChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    taskType: 'All',
    minPay: '',
    location: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-3 top-2 p-1 hover:bg-gray-100 rounded-md"
        >
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Task Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Type
            </label>
            <select
              value={filters.taskType}
              onChange={(e) => handleFilterChange('taskType', e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
            >
              {TASK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
            >
              {LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Pay Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Pay (VND/hour)
            </label>
            <input
              type="number"
              placeholder="Min pay..."
              value={filters.minPay}
              onChange={(e) => handleFilterChange('minPay', e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
            >
              <option value="newest">Newest First</option>
              <option value="pay-high">Highest Pay</option>
              <option value="pay-low">Lowest Pay</option>
              <option value="rating">Worker Rating</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
} 