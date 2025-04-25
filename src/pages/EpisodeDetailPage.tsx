import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getEpisode, getMultipleCharacters } from '../api/client';
import { Episode, Character } from '../types';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const EpisodeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const episodeData = await getEpisode(parseInt(id));
        setEpisode(episodeData);
        
        // Extract character IDs from URLs
        const characterIds = episodeData.characters.map((url) => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        // Fetch the first 10 characters
        const characterData = await getMultipleCharacters(characterIds.slice(0, 10));
        setCharacters(characterData);
      } catch (err) {
        console.error('Error fetching episode details:', err);
        setError('Failed to load episode details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisode();
  }, [id]);

  // Extract season and episode numbers
  const getEpisodeInfo = (episodeCode: string) => {
    const match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return {
        season: parseInt(match[1]),
        episode: parseInt(match[2]),
      };
    }
    return { season: 0, episode: 0 };
  };

  return (
    <div>
      <Link
        to="/episodes"
        className="inline-flex items-center text-indigo-600 dark:text-green-400 hover:text-indigo-800 dark:hover:text-green-500 mb-6 transition-colors duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Episodes
      </Link>
      
      {loading ? (
        <LoadingSkeleton type="detail" />
      ) : error ? (
        <ErrorMessage message={error} retry={() => window.location.reload()} />
      ) : episode ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-600 dark:bg-green-500 text-white text-sm font-bold px-3 py-1 rounded">
                {episode.episode}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Aired: {episode.air_date}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {episode.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Episode Information */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-2">
                  Episode Number
                </h3>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {getEpisodeInfo(episode.episode).episode}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-2">
                  Season
                </h3>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {getEpisodeInfo(episode.episode).season}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-2">
                  Characters
                </h3>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {episode.characters.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Characters
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <Link
                  key={character.id}
                  to={`/characters/${character.id}`}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {character.name}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-1 ${
                        character.status === 'Alive' ? 'bg-green-500' : 
                        character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                      }`}></span>
                      {character.status} - {character.species}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              ))}
            </div>
            
            {characters.length < episode.characters.length && (
              <div className="text-center py-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">
                  +{episode.characters.length - characters.length} more characters
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EpisodeDetailPage;