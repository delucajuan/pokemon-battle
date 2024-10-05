// src/hooks/useBattle.ts
import { useMutation } from '@tanstack/react-query';
import { postFetcher } from '../utils/fetchers';
import { BattleRequest } from '../types/types';

const API_URL = process.env.REACT_APP_API_URL;

const useBattle = () => {
  return useMutation({
    mutationFn: ({ attackerId, defenderId }: BattleRequest) =>
      postFetcher(`${API_URL}/battle`, { attackerId, defenderId }),
  });
};

export default useBattle;
