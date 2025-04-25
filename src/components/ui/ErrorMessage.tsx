import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center transition-colors duration-300">
      <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400 mb-3" />
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Что-то пошло не так</h3>
      <p className="text-red-600 dark:text-red-300 mb-4">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;