import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, MealLog, WorkoutLog, ForumPost, Gender, ActivityLevel } from '../types';

interface AppContextType extends AppState {
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (user: UserProfile) => void;
  addMeal: (meal: Omit<MealLog, 'id'>) => void;
  addWorkout: (workout: Omit<WorkoutLog, 'id'>) => void;
  addPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'likes'>) => void;
  deleteMeal: (id: string) => void;
  deleteWorkout: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'fitlife_app_data_v1';

const defaultState: AppState = {
  user: null,
  meals: [],
  workouts: [],
  posts: [
    {
      id: '1',
      title: 'Best time to do cardio?',
      content: 'I was wondering if I should do cardio before or after weights?',
      author: 'GymRat99',
      category: 'Workout',
      createdAt: Date.now() - 10000000,
      likes: 5
    },
    {
      id: '2',
      title: 'Healthy snack ideas',
      content: 'Looking for low calorie snack ideas for late night cravings.',
      author: 'HealthyLiving',
      category: 'Diet',
      createdAt: Date.now() - 5000000,
      likes: 12
    }
  ],
  isAuthenticated: false
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (user: UserProfile) => {
    setState(prev => ({ ...prev, user, isAuthenticated: true }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
  };

  const updateProfile = (user: UserProfile) => {
    setState(prev => ({ ...prev, user }));
  };

  const addMeal = (meal: Omit<MealLog, 'id'>) => {
    const newMeal: MealLog = { ...meal, id: Date.now().toString() };
    setState(prev => ({ ...prev, meals: [newMeal, ...prev.meals] }));
  };

  const deleteMeal = (id: string) => {
    setState(prev => ({ ...prev, meals: prev.meals.filter(m => m.id !== id) }));
  };

  const addWorkout = (workout: Omit<WorkoutLog, 'id'>) => {
    const newWorkout: WorkoutLog = { ...workout, id: Date.now().toString() };
    setState(prev => ({ ...prev, workouts: [newWorkout, ...prev.workouts] }));
  };

  const deleteWorkout = (id: string) => {
    setState(prev => ({ ...prev, workouts: prev.workouts.filter(w => w.id !== id) }));
  };

  const addPost = (post: Omit<ForumPost, 'id' | 'createdAt' | 'likes'>) => {
    const newPost: ForumPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: Date.now(),
      likes: 0
    };
    setState(prev => ({ ...prev, posts: [newPost, ...prev.posts] }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      logout,
      updateProfile,
      addMeal,
      addWorkout,
      addPost,
      deleteMeal,
      deleteWorkout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};