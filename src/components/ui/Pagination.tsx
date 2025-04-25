import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // If there are no pages or only one page, don't render pagination
  if (totalPages <= 1) return null;

  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-md flex items-center justify-center border ${
              currentPage === 1
                ? 'bg-indigo-600 dark:bg-green-500 text-white border-indigo-600 dark:border-green-500'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors duration-300`}
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}
        </>
      )}
      
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-md flex items-center justify-center border ${
            currentPage === page
              ? 'bg-indigo-600 dark:bg-green-500 text-white border-indigo-600 dark:border-green-500'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          } transition-colors duration-300`}
        >
          {page}
        </button>
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-md flex items-center justify-center border ${
              currentPage === totalPages
                ? 'bg-indigo-600 dark:bg-green-500 text-white border-indigo-600 dark:border-green-500'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors duration-300`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;