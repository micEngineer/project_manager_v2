import React from 'react';
import { Plus, BarChart2, Clock, CheckCircle2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import type { Project } from '../types';

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Modernizing the user interface and improving the shopping experience',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'active',
    progress: 45,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Building a cross-platform mobile application for inventory management',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    status: 'planning',
    progress: 20,
  },
  {
    id: '3',
    name: 'Cloud Migration',
    description: 'Migrating legacy systems to cloud infrastructure',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'completed',
    progress: 100,
  },
];

export default function Dashboard() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>();
  const [modalMode, setModalMode] = React.useState<'create' | 'edit'>('create');

  const handleCreateProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
  };

  const handleEditProject = (projectData: Omit<Project, 'id'>) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((project) =>
      project.id === selectedProject.id
        ? { ...projectData, id: project.id }
        : project
    );
    setProjects(updatedProjects);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const openCreateModal = () => {
    setSelectedProject(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const pendingTasks = projects.reduce((acc, p) => acc + (p.progress < 100 ? 1 : 0), 0);
  const completedProjects = projects.filter((p) => p.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Projects Overview</h2>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <BarChart2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{activeProjects}</h3>
                <p className="text-sm text-gray-500">Active Projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{pendingTasks}</h3>
                <p className="text-sm text-gray-500">Pending Tasks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{completedProjects}</h3>
                <p className="text-sm text-gray-500">Completed Projects</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={modalMode === 'create' ? handleCreateProject : handleEditProject}
          project={selectedProject}
          mode={modalMode}
        />
      </main>
    </div>
  );
}