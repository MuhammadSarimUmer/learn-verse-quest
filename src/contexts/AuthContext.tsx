
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// Define types for our context
type User = {
  id: string;
  username: string;
  email: string;
  name?: string;
  level: number;
  xp: number;
  streak: number;
  profilePicture?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'x-auth-token': token
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        // Mock user data for development if API is unavailable
        if (process.env.NODE_ENV !== 'production') {
          setUser({
            id: 'mock-user-id',
            username: 'devuser',
            email: 'dev@example.com',
            level: 5,
            xp: 2500,
            streak: 7
          });
          setIsAuthenticated(true);
          toast.info("Using mock user data for development");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      try {
        // Fetch user data
        const userResponse = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'x-auth-token': data.token
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          setIsAuthenticated(true);
          toast.success("Login successful!");
        }
      } catch (fetchErr) {
        console.error('Error fetching user data after login:', fetchErr);
        // Mock user data for development if API is unavailable
        if (process.env.NODE_ENV !== 'production') {
          setUser({
            id: 'mock-user-id',
            username: email.split('@')[0],
            email: email,
            level: 1,
            xp: 0,
            streak: 0
          });
          setIsAuthenticated(true);
          toast.info("Using mock user data for development");
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // For development: create mock login when backend is unavailable
        console.log('Using mock login for development');
        const mockToken = 'mock-token-' + Date.now();
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setUser({
          id: 'mock-user-id',
          username: email.split('@')[0],
          email: email,
          level: 1,
          xp: 0,
          streak: 0
        });
        setIsAuthenticated(true);
        toast.info("Mock login successful (development mode)");
        setLoading(false);
        return;
      }
      
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string, name?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Registration failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      try {
        // Fetch user data
        const userResponse = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'x-auth-token': data.token
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          setIsAuthenticated(true);
          toast.success("Registration successful!");
        }
      } catch (fetchErr) {
        console.error('Error fetching user data after registration:', fetchErr);
        // Mock user data for development if API is unavailable
        if (process.env.NODE_ENV !== 'production') {
          setUser({
            id: 'mock-user-id',
            username: username,
            email: email,
            name: name,
            level: 1,
            xp: 0,
            streak: 0
          });
          setIsAuthenticated(true);
          toast.info("Using mock user data for development");
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // For development: create mock registration when backend is unavailable
        console.log('Using mock registration for development');
        const mockToken = 'mock-token-' + Date.now();
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setUser({
          id: 'mock-user-id',
          username: username,
          email: email,
          name: name,
          level: 1,
          xp: 0,
          streak: 0
        });
        setIsAuthenticated(true);
        toast.info("Mock registration successful (development mode)");
        setLoading(false);
        return;
      }
      
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
