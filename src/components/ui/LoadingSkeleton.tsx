import React from 'react';

interface SkeletonProps {
  type: 'card' | 'detail' | 'text';
  count?: number;
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse transition-colors duration-300">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        );
      case 'detail':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-6 animate-pulse transition-colors duration-300">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;