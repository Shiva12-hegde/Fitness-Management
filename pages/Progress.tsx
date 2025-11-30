import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Progress: React.FC = () => {
  const { meals, workouts } = useApp();

  // Generate last 7 days data
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const displayDate = `${d.getDate()}/${d.getMonth() + 1}`;

    const daysMeals = meals.filter(m => m.date === dateStr);
    const daysWorkouts = workouts.filter(w => w.date === dateStr);

    const caloriesIn = daysMeals.reduce((acc, c) => acc + c.calories, 0);
    const caloriesOut = daysWorkouts.reduce((acc, c) => acc + c.caloriesBurned, 0);

    data.push({
      date: displayDate,
      Consumed: caloriesIn,
      Burned: caloriesOut
    });
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Weekly Progress</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Calories: Consumed vs Burned</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar dataKey="Consumed" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Burned" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-2">Weekly Average Intake</h3>
              <p className="text-3xl font-bold text-indigo-700">
                  {Math.round(data.reduce((acc, d) => acc + d.Consumed, 0) / 7)} <span className="text-sm font-normal text-indigo-500">kcal/day</span>
              </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h3 className="font-semibold text-orange-900 mb-2">Weekly Average Burn</h3>
              <p className="text-3xl font-bold text-orange-700">
                  {Math.round(data.reduce((acc, d) => acc + d.Burned, 0) / 7)} <span className="text-sm font-normal text-orange-500">kcal/day</span>
              </p>
          </div>
      </div>
    </div>
  );
};