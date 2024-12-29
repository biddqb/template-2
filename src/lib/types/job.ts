import { Timestamp } from 'firebase/firestore';

export interface Job {
  id: string;
  title: string;
  categories: string[];
  location: string;
  pay: string;
  duration: string;
  startTime: string;
  description: string;
  email: string;
  userId: string;
  userDisplayName?: string;
  userPhotoURL?: string;
  createdAt?: Timestamp;
  status: 'Open' | 'Closed';
} 