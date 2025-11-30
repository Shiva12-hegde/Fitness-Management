export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum ActivityLevel {
  Sedentary = 'Sedentary',
  LightlyActive = 'Lightly Active',
  ModeratelyActive = 'Moderately Active',
  VeryActive = 'Very Active',
  SuperActive = 'Super Active'
}

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack'
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
}

export interface MealLog {
  id: string;
  date: string; // ISO Date string YYYY-MM-DD
  name: string;
  calories: number;
  type: MealType;
  time: string;
}

export interface WorkoutLog {
  id: string;
  date: string; // ISO Date string YYYY-MM-DD
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: number;
  likes: number;
}

export interface AppState {
  user: UserProfile | null;
  meals: MealLog[];
  workouts: WorkoutLog[];
  posts: ForumPost[];
  isAuthenticated: boolean;
}