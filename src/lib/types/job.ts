export interface Worker {
  name: string;
  photo: string;
  rating: number;
  totalReviews: number;
  skills: string[];
}

export interface Job {
  id: number;
  title: string;
  location: string;
  pay: string;
  taskType: string;
  description: string;
  worker: Worker;
  availability: string;
  status: 'Open' | 'Closed' | 'In Progress';
} 