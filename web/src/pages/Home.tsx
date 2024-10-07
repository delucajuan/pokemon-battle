import { Box, Container, Typography, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import usePokemon from '../hooks/usePokemon';
import useHistory from '../hooks/useHistory';
import Error from '../components/common/Error';
import PokemonMiniCard from '../components/pokemon/PokemonMiniCard';
import Battle from '../components/battle/Battle';
import History from '../components/history/History';
import PokemonsSelectSkeleton from '../components/skeletons/PokemonsSelectSkeleton';
import HistorySkeleton from '../components/skeletons/HistorySkeleton';
import { Pokemon } from '../types/types';

function Home() {
  const { data: pokemons, isLoading: loadingPokemons, error: pokemonsError } = usePokemon();
  const { data: battlesData, isLoading: loadingHistory, error: historyError } = useHistory();
  const battles = battlesData?.data;
  const queryClient = useQueryClient();

  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [winnerName, setWinnerName] = useState<string | null>(null);

  const handlePokemonClick = (selectedPokemon: Pokemon) => {
    setAttacker(selectedPokemon);
    setWinnerName(null);

    // Filter out the selected Pokémon and the defender (if attacker is reselected)
    const remainingPokemons =
      pokemons?.filter(
        (pokemon) =>
          pokemon.id !== selectedPokemon.id &&
          (selectedPokemon !== attacker || pokemon.id !== defender?.id),
      ) || [];

    // Randomly select a defender from the remaining Pokémon
    if (remainingPokemons && remainingPokemons.length) {
      const randomIndex = Math.floor(Math.random() * remainingPokemons.length);
      setDefender(remainingPokemons[randomIndex]);
    }
  };

  // Refetch the history data when the winner is set
  useEffect(() => {
    if (winnerName) {
      queryClient.invalidateQueries({ queryKey: ['history'] }); // Invalidate the 'history' query to trigger refetch
    }
  }, [winnerName, queryClient]);

  if (pokemonsError || historyError) {
    return <Error />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: '800px', minWidth: '300px', padding: { xs: 1, sm: 2 } }}
    >
      {loadingPokemons ? (
        <PokemonsSelectSkeleton />
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            Battle of Pokémon
          </Typography>
          <Typography variant="h5" gutterBottom>
            Select your Pokémon
          </Typography>
          <Grid2 container spacing={2} justifyContent="center" paddingY={3}>
            {pokemons?.map((pokemon) => (
              <Grid2 key={pokemon.id}>
                <PokemonMiniCard pokemon={pokemon} onClick={handlePokemonClick} />
              </Grid2>
            ))}
          </Grid2>
          {attacker && (
            <Box paddingY={3}>
              <Battle
                attacker={attacker}
                defender={defender}
                winnerName={winnerName}
                setWinnerName={setWinnerName}
              />
            </Box>
          )}
        </>
      )}

      {loadingHistory ? (
        <HistorySkeleton />
      ) : (
        battles &&
        battles?.length > 0 && (
          <Box paddingY={3}>
            <Typography variant="h5" gutterBottom>
              Recent battles
            </Typography>
            <History battles={battles} />
          </Box>
        )
      )}
    </Container>
  );
}

export default Home;
