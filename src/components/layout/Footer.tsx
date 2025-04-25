import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            Работает на основе {' '}
            <a 
              href="https://rickandmortyapi.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 dark:text-green-400 hover:underline"
            >
              Rick and Morty API
            </a>
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/yourusername/rick-and-morty-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-green-400 transition-colors duration-300"
            >
              <Github size={20} className="mr-2" />
              <span>Исходный код</span>
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Путеводитель по Рику и Морти. Это фанатский сайт.
        </div>
      </div>
    </footer>
  );
};

export default Footer;