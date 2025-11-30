import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, User, Clock, Heart } from 'lucide-react';

export const Forum: React.FC = () => {
  const { posts, addPost, user } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addPost({
      title,
      content,
      category,
      author: user.name
    });
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium"
        >
          Create Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Start a Discussion</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="What's on your mind?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                 value={category}
                 onChange={e => setCategory(e.target.value)}
                 className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                  <option>General</option>
                  <option>Diet</option>
                  <option>Workout</option>
                  <option>Motivation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Share your details..."
              />
            </div>
            <div className="flex justify-end gap-2">
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
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">{post.category}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={12}/> {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={16} className="mr-1" />
                    <span>Posted by <span className="font-medium text-gray-800">{post.author}</span></span>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-1 text-gray-400">
                  <Heart size={20} />
                  <span className="text-xs">{post.likes}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};