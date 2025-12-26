
export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}

export type Category = 'General' | 'Travel' | 'Family' | 'Love' | 'Milestone' | 'Nature';

export const CATEGORIES: Category[] = ['General', 'Travel', 'Family', 'Love', 'Milestone', 'Nature'];
