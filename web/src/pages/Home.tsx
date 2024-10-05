import { Container, Grid2, Typography } from '@mui/material';
import usePokemon from '../hooks/usePokemon';
import Error from '../components/Error';
import PokemonMiniCard from '../components/PokemonMiniCard';
import { Pokemon } from '../types/types';
import Battle from '../components/Battle';
import { useState } from 'react';

function Home() {
  const { data: pokemons, isLoading, error } = usePokemon();

  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);

  const handlePokemonClick = (selectedPokemon: Pokemon) => {
    setAttacker(selectedPokemon);
    const remainingPokemons = pokemons?.filter((pokemon) => pokemon.id !== selectedPokemon.id);

    // Randomly select a defender from the remaining Pokémon
    if (remainingPokemons && remainingPokemons.length) {
      const randomIndex = Math.floor(Math.random() * remainingPokemons.length);
      setDefender(remainingPokemons[randomIndex]);
    }
  };

  const handleWinner = (pokemonName: string) => {
    alert(`${pokemonName} wins!`);
  };

  if (isLoading) {
    return <>loading</>;
  }
  if (error || !pokemons) {
    return <Error />;
  }
  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Battle of Pokémon
      </Typography>
      <Typography variant="h5" gutterBottom>
        Select your Pokémon
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        {pokemons?.map((pokemon) => (
          <Grid2 key={pokemon.id}>
            <PokemonMiniCard pokemon={pokemon} onClick={handlePokemonClick} />
          </Grid2>
        ))}
      </Grid2>
      <Battle attacker={attacker} defender={defender} onWin={handleWinner} />
    </Container>
  );
}

export default Home;
