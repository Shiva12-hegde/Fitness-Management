import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLevel, Gender } from '../types';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useApp();
  const [success, setSuccess] = useState(false);

  // Form State initialized with user data
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age.toString() || '');
  const [height, setHeight] = useState(user?.height.toString() || '');
  const [weight, setWeight] = useState(user?.weight.toString() || '');
  const [gender, setGender] = useState<Gender>(user?.gender || Gender.Male);
  const [activity, setActivity] = useState<ActivityLevel>(user?.activityLevel || ActivityLevel.Sedentary);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    updateProfile({
      ...user,
      name,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      gender,
      activityLevel: activity
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-6 mb-8">
           <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700">
             {name.charAt(0)}
           </div>
           <div>
             <h2 className="text-xl font-bold text-gray-900">{user.email}</h2>
             <p className="text-gray-500">Member since 2024</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
               <input
                 type="number"
                 value={age}
                 onChange={e => setAge(e.target.value)}
                 className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
               <input
                 type="number"
                 value={weight}
                 onChange={e => setWeight(e.target.value)}
                 className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
               <input
                 type="number"
                 value={height}
                 onChange={e => setHeight(e.target.value)}
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
                 {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
               <select
                 value={activity}
                 onChange={e => setActivity(e.target.value as ActivityLevel)}
                 className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
               >
                 {Object.values(ActivityLevel).map(a => <option key={a} value={a}>{a}</option>)}
               </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
             {success && <span className="text-green-600 font-medium animate-pulse">Profile updated successfully!</span>}
             <button
               type="submit"
               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium"
             >
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};