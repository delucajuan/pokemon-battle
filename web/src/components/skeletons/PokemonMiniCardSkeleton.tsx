import { Skeleton } from '@mui/material';

function PokemonMiniCardSkeleton() {
  return (
    <Skeleton variant="rounded" sx={{ width: { xs: 130, sm: 140 }, height: 180 }}></Skeleton>
  );
}

export default PokemonMiniCardSkeleton;
