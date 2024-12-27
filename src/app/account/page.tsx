'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { redirect } from 'next/navigation';
import ProfileTab from './ProfileTab';
import JobManagementTab from './JobManagementTab';
import { User, Calendar } from 'lucide-react';

type TabType = 'profile' | 'jobs';

export default function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  if (!user) {
    redirect('/login');
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'jobs', label: 'Job Management', icon: Calendar },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="flex gap-8">
          {/* Left Column - Tabs */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-lg shadow">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {activeTab === 'profile' ? <ProfileTab /> : <JobManagementTab />}
          </div>
        </div>
      </div>
    </main>
  );
} 