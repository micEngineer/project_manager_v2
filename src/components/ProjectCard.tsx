import React from 'react';
import { Calendar, Users, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                className="h-6 w-6 rounded-full border-2 border-white"
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <CheckCircle className="h-4 w-4 mr-2" />
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}