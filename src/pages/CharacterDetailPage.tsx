import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ChevronRight, Bot } from 'lucide-react';
import { getCharacter, getMultipleEpisodes } from '../api/client';
import { Character, Episode } from '../types';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiDescription, setAiDescription] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const characterData = await getCharacter(parseInt(id));
        setCharacter(characterData);
        
        const episodeIds = characterData.episode.map((url) => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        const episodeData = await getMultipleEpisodes(episodeIds.slice(0, 5));
        setEpisodes(episodeData);

        // Fetch AI description
        setLoadingAI(true);
        setAiError(null);
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-character-description`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ character: characterData }),
          });

          if (!response.ok) throw new Error('Failed to fetch AI description');
          
          const data = await response.json();
          setAiDescription(data.description);
        } catch (err) {
          console.error('Error fetching AI description:', err);
          setAiError('Не удалось получить ИИ-описание персонажа');
        } finally {
          setLoadingAI(false);
        }
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('Не удалось загрузить информацию о персонаже. Пожалуйста, попробуйте снова.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacter();
  }, [id]);

  const getStatusColor = (status: string) => {
    return {
      Alive: 'bg-green-500',
      Dead: 'bg-red-500',
      unknown: 'bg-gray-500',
    }[status] || 'bg-gray-500';
  };

  return (
    <div>
      <Link
        to="/characters"
        className="inline-flex items-center text-indigo-600 dark:text-green-400 hover:text-indigo-800 dark:hover:text-green-500 mb-6 transition-colors duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Назад к списку персонажей
      </Link>
      
      {loading ? (
        <LoadingSkeleton type="detail" />
      ) : error ? (
        <ErrorMessage message={error} retry={() => window.location.reload()} />
      ) : character ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full p-2 shadow-md">
                <Heart 
                  size={24} 
                  className="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {character.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span 
                  className={`inline-block h-3 w-3 rounded-full ${getStatusColor(character.status)} mr-2`}
                ></span>
                <span className="text-gray-700 dark:text-gray-300 text-lg">
                  {character.status} - {character.species}
                  {character.type && ` (${character.type})`}
                </span>
              </div>

              {/* AI Description */}
              <div className="mb-6 p-4 bg-indigo-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Bot size={20} className="text-indigo-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ИИ-описание персонажа
                  </h3>
                </div>
                {loadingAI ? (
                  <LoadingSkeleton type="text" />
                ) : aiError ? (
                  <p className="text-red-600 dark:text-red-400">{aiError}</p>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">{aiDescription}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                    Пол
                  </h3>
                  <p className="text-gray-900 dark:text-gray-100">{character.gender}</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                    Происхождение
                  </h3>
                  <p className="text-gray-900 dark:text-gray-100">{character.origin.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                    Последнее известное местоположение
                  </h3>
                  <Link 
                    to={character.location.url ? `/locations/${character.location.url.split('/').pop()}` : '#'} 
                    className={character.location.url ? "text-indigo-600 dark:text-green-400 hover:underline" : "text-gray-900 dark:text-gray-100"}
                  >
                    {character.location.name}
                  </Link>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1">
                    Количество эпизодов
                  </h3>
                  <p className="text-gray-900 dark:text-gray-100">{character.episode.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Появления в эпизодах
            </h2>
            
            <div className="space-y-3">
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  to={`/episodes/${episode.id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {episode.name}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {episode.episode} | {episode.air_date}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              ))}
              
              {episodes.length < character.episode.length && (
                <div className="text-center py-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    +{character.episode.length - episodes.length} эпизодов
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CharacterDetailPage;