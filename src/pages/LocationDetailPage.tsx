import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getLocation, getMultipleCharacters } from '../api/client';
import { Location, Character } from '../types';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const locationData = await getLocation(parseInt(id));
        setLocation(locationData);
        
        // Extract resident IDs from URLs
        const residentIds = locationData.residents.map((url) => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        // Fetch the first 12 residents
        const residentData = await getMultipleCharacters(residentIds.slice(0, 12));
        setResidents(residentData);
      } catch (err) {
        console.error('Error fetching location details:', err);
        setError('Failed to load location details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocation();
  }, [id]);

  return (
    <div>
      <Link
        to="/locations"
        className="inline-flex items-center text-indigo-600 dark:text-green-400 hover:text-indigo-800 dark:hover:text-green-500 mb-6 transition-colors duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Locations
      </Link>
      
      {loading ? (
        <LoadingSkeleton type="detail" />
      ) : error ? (
        <ErrorMessage message={error} retry={() => window.location.reload()} />
      ) : location ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {location.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Type
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-lg">
                  {location.type || 'Unknown'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Dimension
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-lg">
                  {location.dimension || 'Unknown'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Number of Residents
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-lg">
                  {location.residents.length}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Created
                </h3>
                <p className="text-gray-900 dark:text-gray-100 text-lg">
                  {new Date(location.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Residents
            </h2>
            
            {residents.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">No known residents</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {residents.map((resident) => (
                  <Link
                    key={resident.id}
                    to={`/characters/${resident.id}`}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <img 
                      src={resident.image} 
                      alt={resident.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {resident.name}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-1 ${
                          resident.status === 'Alive' ? 'bg-green-500' : 
                          resident.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></span>
                        {resident.status} - {resident.species}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            )}
            
            {residents.length > 0 && residents.length < location.residents.length && (
              <div className="text-center py-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">
                  +{location.residents.length - residents.length} more residents
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LocationDetailPage;