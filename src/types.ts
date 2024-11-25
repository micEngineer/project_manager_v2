export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  progress: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  completed: boolean;
}