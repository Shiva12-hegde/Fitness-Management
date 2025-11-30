import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MealType } from '../types';
import { Plus, Trash2, Calendar } from 'lucide-react';

export const Meals: React.FC = () => {
  const { meals, addMeal, deleteMeal } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Form State
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [type, setType] = useState<MealType>(MealType.Breakfast);
  const [time, setTime] = useState('08:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMeal({
      date: filterDate,
      name,
      calories: Number(calories),
      type,
      time
    });
    // Reset
    setName('');
    setCalories('');
    setShowForm(false);
  };

  const filteredMeals = meals.filter(m => m.date === filterDate);
  const totalCalories = filteredMeals.reduce((acc, m) => acc + m.calories, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Meal Log</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Log Meal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
        <Calendar className="text-gray-400" />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="ml-auto font-medium text-gray-700">
          Total: <span className="text-indigo-600">{totalCalories} kcal</span>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-indigo-100 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Add New Meal</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Grilled Chicken Salad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
              <input
                required
                type="number"
                value={calories}
                onChange={e => setCalories(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 450"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as MealType)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {Object.values(MealType).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
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
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Meal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filteredMeals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500">No meals logged for this date.</p>
          </div>
        ) : (
          filteredMeals.sort((a,b) => a.time.localeCompare(b.time)).map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                    {meal.type === 'Breakfast' && <span className="text-2xl">☕</span>}
                    {meal.type === 'Lunch' && <span className="text-2xl">🥗</span>}
                    {meal.type === 'Dinner' && <span className="text-2xl">🍽️</span>}
                    {meal.type === 'Snack' && <span className="text-2xl">🍎</span>}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                  <p className="text-sm text-gray-500">{meal.type} • {meal.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-700">{meal.calories} kcal</span>
                <button
                  onClick={() => deleteMeal(meal.id)}
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