import { useQuery } from '@tanstack/react-query';
import { getFetcher } from '../utils/fetchers';
import { Pokemon } from '../types/types';

const API_URL = process.env.REACT_APP_API_URL;

const usePokemon = () => {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemon'],
    queryFn: () => getFetcher(`${API_URL}/pokemon`),
  });
};

export default usePokemon;
