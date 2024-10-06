import { Alert, AlertTitle, Box, Container, Grid2, Typography } from '@mui/material';
import usePokemon from '../hooks/usePokemon';
import Error from '../components/Error';
import PokemonMiniCard from '../components/PokemonMiniCard';
import { Pokemon } from '../types/types';
import Battle from '../components/Battle';
import { useEffect, useState } from 'react';
import History from '../components/History';
import useHistory from '../hooks/useHistory';
import { useQueryClient } from '@tanstack/react-query';

function Home() {
  const { data: pokemons, isLoading, error } = usePokemon();
  const { data: battlesData } = useHistory();
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

  if (isLoading) {
    return <></>;
  }
  if (error || !pokemons) {
    return <Error />;
  }
  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: '800px', minWidth: '300px', padding: { xs: 1, sm: 2 } }}
    >
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
      {winnerName && (
        <Alert
          icon={false}
          variant="filled"
          color="success"
          sx={{
            justifyContent: 'center',
            maxWidth: 230,
            margin: 'auto',
            borderRadius: '30px',
          }}
        >
          <AlertTitle variant="h6" margin={0}>
            {winnerName} wins!
          </AlertTitle>
        </Alert>
      )}
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
      {battles && battles.length && (
        <Box paddingY={3}>
          <Typography variant="h5" gutterBottom>
            Recent battles
          </Typography>
          <History battles={battles} />
        </Box>
      )}
    </Container>
  );
}

export default Home;
