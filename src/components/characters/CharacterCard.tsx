import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  // Status dot color
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status];

  return (
    <Link 
      to={`/characters/${character.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white truncate">{character.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className={`h-3 w-3 rounded-full ${statusColor} mr-2`}></span>
          <span className="text-gray-700 dark:text-gray-300">
            {character.status} - {character.species}
          </span>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last known location:</p>
          <p className="text-gray-700 dark:text-gray-300 truncate">{character.location.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Origin:</p>
          <p className="text-gray-700 dark:text-gray-300 truncate">{character.origin.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;