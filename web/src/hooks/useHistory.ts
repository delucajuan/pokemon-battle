import { useQuery } from '@tanstack/react-query';
import { getFetcher } from '../utils/fetchers';
import { BattlesResponse } from '../types/types';

const API_URL = process.env.REACT_APP_API_URL;

const useBattle = () => {
  return useQuery<BattlesResponse>({
    queryKey: ['history'],
    queryFn: () => getFetcher(`${API_URL}/battle`),
  });
};

export default useBattle;
