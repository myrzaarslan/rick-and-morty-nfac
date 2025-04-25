import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/client';
import { Character, Filter, Response } from '../types';
import CharacterCard from '../components/characters/CharacterCard';
import SearchInput from '../components/ui/SearchInput';
import Pagination from '../components/ui/Pagination';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Response<Character>['info'] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const filter: Filter = {};
      
      if (searchTerm) filter.name = searchTerm;
      if (status) filter.status = status;
      if (gender) filter.gender = gender;
      if (species) filter.species = species;
      
      const data = await getCharacters(page, filter);
      setCharacters(data.results);
      setInfo(data.info);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError('Failed to load characters. Please try again.');
      setCharacters([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

  const handleSearch = () => {
    fetchCharacters(1);
  };

  const handlePageChange = (page: number) => {
    fetchCharacters(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (
    filterType: 'status' | 'gender' | 'species',
    value: string
  ) => {
    switch (filterType) {
      case 'status':
        setStatus(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'species':
        setSpecies(value);
        break;
    }
  };

  const clearFilters = () => {
    setStatus('');
    setGender('');
    setSpecies('');
    setSearchTerm('');
    fetchCharacters(1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Characters
      </h1>
      
      <div className="mb-8">
        <SearchInput
          placeholder="Search for characters..."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            >
              <option value="">Any</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            >
              <option value="">Any</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Species
            </label>
            <input
              type="text"
              value={species}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              placeholder="e.g. Human, Alien"
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            />
          </div>
          
          <div className="flex items-end">
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
        <ErrorMessage message={error} retry={() => fetchCharacters(currentPage)} />
      ) : characters.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No characters found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            Showing {characters.length} character{characters.length !== 1 ? 's' : ''} 
            {info && info.count > 0 ? ` (of ${info.count} total)` : ''}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
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

export default CharactersPage;