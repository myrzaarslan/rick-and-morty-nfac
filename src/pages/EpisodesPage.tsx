import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../api/client';
import { Episode, Filter, Response } from '../types';
import EpisodeCard from '../components/episodes/EpisodeCard';
import SearchInput from '../components/ui/SearchInput';
import Pagination from '../components/ui/Pagination';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorMessage from '../components/ui/ErrorMessage';

const EpisodesPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [info, setInfo] = useState<Response<Episode>['info'] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const filter: Filter = {};
      
      if (searchTerm) filter.name = searchTerm;
      
      const data = await getEpisodes(page, filter);
      setEpisodes(data.results);
      setInfo(data.info);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      setError('Failed to load episodes. Please try again.');
      setEpisodes([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(1);
  }, []);

  const handleSearch = () => {
    fetchEpisodes(1);
  };

  const handlePageChange = (page: number) => {
    fetchEpisodes(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Episodes
      </h1>
      
      <div className="mb-8">
        <SearchInput
          placeholder="Search for episodes..."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton type="card" count={9} />
        </div>
      ) : error ? (
        <ErrorMessage message={error} retry={() => fetchEpisodes(currentPage)} />
      ) : episodes.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No episodes found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            Showing {episodes.length} episode{episodes.length !== 1 ? 's' : ''} 
            {info && info.count > 0 ? ` (of ${info.count} total)` : ''}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
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

export default EpisodesPage;