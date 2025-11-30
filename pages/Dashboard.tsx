import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Flame, Utensils, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, meals, workouts } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const todayMeals = meals.filter(m => m.date === todayStr);
  const todayWorkouts = workouts.filter(w => w.date === todayStr);

  const caloriesConsumed = todayMeals.reduce((acc, curr) => acc + curr.calories, 0);
  const caloriesBurned = todayWorkouts.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  // BMI Calculation
  const heightInMeters = (user?.height || 170) / 100;
  const bmi = (user?.weight || 70) / (heightInMeters * heightInMeters);
  let bmiCategory = 'Normal';
  let bmiColor = 'text-green-600';
  
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-yellow-600';
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-orange-600';
  } else if (bmi >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-600';
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500 mt-1">Here is your daily health summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Calories Consumed Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Calories Consumed</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{caloriesConsumed}</h3>
            <p className="text-xs text-gray-400 mt-1">Today</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Utensils className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Calories Burned Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Calories Burned</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{caloriesBurned}</h3>
            <p className="text-xs text-gray-400 mt-1">Today</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        {/* BMI Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Current BMI</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{bmi.toFixed(1)}</h3>
            <p className={`text-sm font-medium mt-1 ${bmiColor}`}>{bmiCategory}</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        {/* Workouts Count */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Workouts</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{todayWorkouts.length}</h3>
            <p className="text-xs text-gray-400 mt-1">Sessions today</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Meals</h3>
                <Link to="/meals" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View All</Link>
            </div>
            {todayMeals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No meals logged today.</p>
                    <Link to="/meals" className="mt-2 inline-block text-indigo-600 text-sm font-medium">Log a meal</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {todayMeals.slice(0, 3).map((meal) => (
                        <div key={meal.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-gray-900">{meal.name}</p>
                                <p className="text-xs text-gray-500">{meal.type} • {meal.time}</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{meal.calories} kcal</span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Workouts</h3>
                <Link to="/workouts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View All</Link>
            </div>
            {todayWorkouts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No workouts logged today.</p>
                    <Link to="/workouts" className="mt-2 inline-block text-indigo-600 text-sm font-medium">Log a workout</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {todayWorkouts.slice(0, 3).map((workout) => (
                        <div key={workout.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-gray-900">{workout.type}</p>
                                <p className="text-xs text-gray-500">{workout.durationMinutes} mins</p>
                            </div>
                            <span className="text-sm font-semibold text-orange-600">-{workout.caloriesBurned} kcal</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      <div className="mt-8 bg-indigo-900 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Need advice?</h3>
              <p className="text-indigo-200 text-sm max-w-lg">Get a personalized diet and health plan generated by our AI based on your body metrics.</p>
          </div>
          <Link to="/diet-plan" className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
              Generate AI Plan
          </Link>
      </div>
    </div>
  );
};