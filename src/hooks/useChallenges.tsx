
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

// API base URL
const API_URL = 'http://localhost:5000/api';

// Types
export type Challenge = {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  timeEstimate: string;
  language: string;
  topics: string[];
  instructions: string;
  startingCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
  solution?: string;
  hints: string[];
  createdAt: Date;
};

export function useChallenges(language?: string) {
  const { token } = useAuth();

  // Fetch all challenges
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges', language],
    queryFn: async (): Promise<Challenge[]> => {
      let url = `${API_URL}/challenges`;
      if (language) {
        url += `?language=${language}`;
      }

      const response = await fetch(url, {
        headers: token ? { 'x-auth-token': token } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch challenges');
      }

      return response.json();
    }
  });

  // Fetch a specific challenge
  const getChallenge = async (id: string): Promise<Challenge> => {
    try {
      const response = await fetch(`${API_URL}/challenges/${id}`, {
        headers: token ? { 'x-auth-token': token } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch challenge');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while fetching the challenge');
      }
      throw error;
    }
  };

  // Submit a challenge solution
  const submitSolution = async (id: string, code: string): Promise<any> => {
    if (!token) {
      toast.error('You must be logged in to submit solutions');
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_URL}/challenges/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to submit solution');
      }

      const result = await response.json();
      if (result.success) {
        toast.success('Challenge completed successfully!');
      } else {
        toast.error('Your solution did not pass all test cases');
      }
      
      return result;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while submitting your solution');
      }
      throw error;
    }
  };

  return {
    challenges,
    isLoading,
    error,
    getChallenge,
    submitSolution
  };
}
