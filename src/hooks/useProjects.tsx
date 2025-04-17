
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

// API base URL
const API_URL = 'http://localhost:5000/api';

// Types
export type Project = {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  category: string;
  languages: string[];
  topics: string[];
  popular: boolean;
  steps: {
    title: string;
    description: string;
    code?: string;
    resources: {
      title: string;
      url: string;
    }[];
  }[];
  requirements: string[];
  createdAt: Date;
};

export function useProjects(category?: string) {
  const { token } = useAuth();

  // Fetch all projects
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects', category],
    queryFn: async (): Promise<Project[]> => {
      let url = `${API_URL}/projects`;
      if (category) {
        url += `?category=${category}`;
      }

      const response = await fetch(url, {
        headers: token ? { 'x-auth-token': token } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch projects');
      }

      return response.json();
    }
  });

  // Fetch a specific project
  const getProject = async (id: string): Promise<Project> => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        headers: token ? { 'x-auth-token': token } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch project');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while fetching the project');
      }
      throw error;
    }
  };

  // Save project progress
  const saveProjectProgress = async (id: string, completed: boolean): Promise<any> => {
    if (!token) {
      toast.error('You must be logged in to save progress');
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_URL}/projects/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to save project progress');
      }

      const result = await response.json();
      if (completed) {
        toast.success('Project marked as completed!');
      } else {
        toast.success('Project progress saved!');
      }
      
      return result;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while saving your progress');
      }
      throw error;
    }
  };

  return {
    projects,
    isLoading,
    error,
    getProject,
    saveProjectProgress
  };
}
