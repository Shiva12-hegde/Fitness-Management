import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ActivityLevel, Gender } from '../types';
import { BrainCircuit } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Registration State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [activity, setActivity] = useState<ActivityLevel>(ActivityLevel.Sedentary);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Login/Register success
    const userProfile = {
      name: name || 'Demo User',
      email: email || 'demo@example.com',
      age: Number(age) || 25,
      gender: gender,
      height: Number(height) || 175,
      weight: Number(weight) || 70,
      activityLevel: activity
    };
    login(userProfile);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <BrainCircuit className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin ? 'Enter your details to access your fitness plan.' : 'Start your health journey today.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <input
               required
               type="password"
               defaultValue="password"
               className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
             />
          </div>

          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  required
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select 
                  value={gender}
                  onChange={e => setGender(e.target.value as Gender)}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value={Gender.Male}>Male</option>
                  <option value={Gender.Female}>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  required
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  required
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                 <select
                   value={activity}
                   onChange={e => setActivity(e.target.value as ActivityLevel)}
                   className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                    {Object.values(ActivityLevel).map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                 </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};