'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Star, Clock } from 'lucide-react';

export default function ProfileTab() {
  const { user } = useAuth();

  // This would typically come from your user profile data in Firebase
  const mockUserData = {
    skills: ['House Cleaning', 'Cooking', 'Event Management'],
    rating: 4.8,
    totalReviews: 56,
    availability: 'Weekdays 9 AM - 5 PM',
    reviews: [
      {
        id: 1,
        author: 'Nguyen Van A',
        rating: 5,
        comment: 'Excellent service, very professional and punctual.',
        date: '2024-01-15',
      },
      {
        id: 2,
        author: 'Tran Thi B',
        rating: 4,
        comment: 'Good work ethic and communication.',
        date: '2024-01-10',
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.displayName || 'User'}
          </h2>
          <div className="flex items-center mt-1">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">
              {mockUserData.rating} ({mockUserData.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mockUserData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          {mockUserData.availability}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviews</h3>
        <div className="space-y-4">
          {mockUserData.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.author}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                </div>
              </div>
              <p className="mt-1 text-gray-600">{review.comment}</p>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 