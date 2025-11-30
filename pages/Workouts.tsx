import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Calendar, Activity } from 'lucide-react';

export const Workouts: React.FC = () => {
  const { workouts, addWorkout, deleteWorkout } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const [type, setType] = useState('Running');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout({
      date: filterDate,
      type,
      durationMinutes: Number(duration),
      caloriesBurned: Number(caloriesBurned),
    });
    // Reset
    setType('Running');
    setDuration('');
    setCaloriesBurned('');
    setShowForm(false);
  };

  const filteredWorkouts = workouts.filter(w => w.date === filterDate);
  const totalBurned = filteredWorkouts.reduce((acc, w) => acc + w.caloriesBurned, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Workout Log</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Log Workout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
        <Calendar className="text-gray-400" />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="ml-auto font-medium text-gray-700">
          Total Burned: <span className="text-orange-600">{totalBurned} kcal</span>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-orange-100 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Add New Workout</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workout Type</label>
              <select
                 value={type}
                 onChange={e => setType(e.target.value)}
                 className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                  <option value="Running">Running</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Weight Lifting">Weight Lifting</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Swimming">Swimming</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Walking">Walking</option>
                  <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                required
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="e.g. 45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned (Estimated)</label>
              <input
                required
                type="number"
                value={caloriesBurned}
                onChange={e => setCaloriesBurned(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="e.g. 300"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Save Workout
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500">No workouts logged for this date.</p>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{workout.type}</h3>
                  <p className="text-sm text-gray-500">{workout.durationMinutes} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-700">-{workout.caloriesBurned} kcal</span>
                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};