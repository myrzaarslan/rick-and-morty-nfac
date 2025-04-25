import React, { useEffect, useState } from 'react';
import { getLocations } from '../api/client';
import { Location, Filter, Response } from '../types';
import LocationCard from '../components/locations/LocationCard';
import SearchInput from '../components/ui/SearchInput';
import Pagination from '../components/ui/Pagination';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [info, setInfo] = useState<Response<Location>['info'] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const filter: Filter = {};
      
      if (searchTerm) filter.name = searchTerm;
      if (type) filter.type = type;
      if (dimension) filter.dimension = dimension;
      
      const data = await getLocations(page, filter);
      setLocations(data.results);
      setInfo(data.info);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load locations. Please try again.');
      setLocations([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(1);
  }, []);

  const handleSearch = () => {
    fetchLocations(1);
  };

  const handlePageChange = (page: number) => {
    fetchLocations(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setType('');
    setDimension('');
    setSearchTerm('');
    fetchLocations(1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Locations
      </h1>
      
      <div className="mb-8">
        <SearchInput
          placeholder="Search for locations..."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Planet, Space station"
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dimension
            </label>
            <input
              type="text"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              placeholder="e.g. C-137, Replacement Dimension"
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            />
          </div>
          
          <div className="flex items-end pt-6">
            <button
              onClick={clearFilters}
              className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton type="card" count={9} />
        </div>
      ) : error ? (
        <ErrorMessage message={error} retry={() => fetchLocations(currentPage)} />
      ) : locations.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No locations found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            Showing {locations.length} location{locations.length !== 1 ? 's' : ''} 
            {info && info.count > 0 ? ` (of ${info.count} total)` : ''}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          
          {info && (
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LocationsPage;