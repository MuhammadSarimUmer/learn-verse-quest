
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

// API base URL
const API_URL = 'http://localhost:5000/api';

// Types
type Skill = {
  skillId: string;
  name: string;
  category: string;
  progress: number;
  status: 'locked' | 'in-progress' | 'completed';
  completedAt?: Date;
};

type UserProgress = {
  user: string;
  language: string;
  skills: Skill[];
  completedChallenges: any[];
  completedProjects: any[];
  currentCourse: {
    courseId?: string;
    name?: string;
    progress: number;
  };
  updatedAt: Date;
};

export function useProgress(language: string) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user progress for a specific language
  const { data, isLoading, error } = useQuery({
    queryKey: ['userProgress', language],
    queryFn: async (): Promise<UserProgress> => {
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/progress/${language}`, {
        headers: {
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch progress');
      }

      return response.json();
    },
    enabled: !!token,
  });

  // Update skill progress
  const updateSkillProgress = useMutation({
    mutationFn: async ({ skillId, progress }: { skillId: string; progress: number }) => {
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/progress/skill/${language}/${skillId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ progress })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to update progress');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userProgress', language] });
      toast.success('Progress updated successfully');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while updating progress');
      }
    }
  });

  // Update user streak
  const updateStreak = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/progress/streak`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to update streak');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(`Streak updated: ${data.streak} days!`);
      // You might want to update user data in the auth context as well
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while updating streak');
      }
    }
  });

  return {
    progress: data,
    isLoading,
    error,
    updateSkillProgress,
    updateStreak
  };
}
