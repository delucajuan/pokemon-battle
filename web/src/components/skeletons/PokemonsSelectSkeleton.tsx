import { Grid2, Skeleton, Typography } from '@mui/material';
import PokemonMiniCardSkeleton from './PokemonMiniCardSkeleton';

function PokemonsSelectSkeleton() {
  return (
    <>
      <Skeleton>
        <Typography variant="h3" gutterBottom>
          Battle of Pokémon
        </Typography>
      </Skeleton>
      <Skeleton>
        <Typography variant="h5" gutterBottom>
          Select your Pokémon
        </Typography>
      </Skeleton>

      <Grid2 container spacing={2} justifyContent="center" paddingY={3}>
        {[...Array(5)].map((_, index) => (
          <PokemonMiniCardSkeleton key={index} />
        ))}
      </Grid2>
    </>
  );
}

export default PokemonsSelectSkeleton;
