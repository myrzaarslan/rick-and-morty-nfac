import React from 'react';
import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { Episode } from '../../types';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  // Extract season and episode numbers
  const match = episode.episode.match(/S(\d+)E(\d+)/);
  const season = match ? match[1].padStart(2, '0') : '??';
  const episodeNum = match ? match[2].padStart(2, '0') : '??';

  return (
    <Link 
      to={`/episodes/${episode.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative bg-indigo-100 dark:bg-gray-700 p-6 flex items-center justify-center">
        <div className="absolute top-2 right-2 bg-indigo-600 dark:bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          S{season}E{episodeNum}
        </div>
        <Tv 
          size={64} 
          className="text-indigo-600 dark:text-green-400"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">{episode.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-1">{episode.air_date}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {episode.characters.length} character{episode.characters.length !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  );
};

export default EpisodeCard;