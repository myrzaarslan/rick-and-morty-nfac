import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-64 h-64 mb-8 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse flex items-center justify-center overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-spin-slow"></div>
          <div className="absolute w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-10">
            <span className="text-8xl font-bold">?</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        404 - Страница не найдена
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Похоже, вы попали в альтернативное измерение, которого не существует в этой вселенной.
      </p>
      
      <Link 
        to="/"
        className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-green-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-green-500 transition-colors duration-300"
      >
        <Home size={20} className="mr-2" />
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;