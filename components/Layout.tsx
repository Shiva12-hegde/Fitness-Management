import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Dumbbell, 
  LineChart, 
  BrainCircuit, 
  MessageSquare, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Layout: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/meals', label: 'Meals', icon: Utensils },
    { to: '/workouts', label: 'Workouts', icon: Dumbbell },
    { to: '/progress', label: 'Progress', icon: LineChart },
    { to: '/diet-plan', label: 'AI Diet Plan', icon: BrainCircuit },
    { to: '/forum', label: 'Community', icon: MessageSquare },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" /> FitLife AI
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 px-2">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
               {user?.name.charAt(0).toUpperCase()}
             </div>
             <div className="ml-3">
               <p className="text-sm font-medium text-gray-700 truncate w-32">{user?.name}</p>
             </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16">
          <span className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" /> FitLife
          </span>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-500">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>
        
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white z-20 border-b shadow-lg pb-4">
            <nav className="flex flex-col px-4 space-y-2 pt-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 text-base font-medium rounded-md ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center px-3 py-3 text-base font-medium text-red-600 rounded-md"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};