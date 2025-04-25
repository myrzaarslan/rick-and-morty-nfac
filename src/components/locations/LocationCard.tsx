import React from 'react';
import { Link } from 'react-router-dom';
import { Map } from 'lucide-react';
import { Location } from '../../types';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Link 
      to={`/locations/${location.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="bg-indigo-100 dark:bg-gray-700 p-6 flex items-center justify-center">
        <Map 
          size={64} 
          className="text-indigo-600 dark:text-green-400"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">{location.name}</h3>
        <div className="mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Type:</p>
          <p className="text-gray-700 dark:text-gray-300">{location.type || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Dimension:</p>
          <p className="text-gray-700 dark:text-gray-300 truncate">{location.dimension || 'Unknown'}</p>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {location.residents.length} resident{location.residents.length !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  );
};

export default LocationCard;