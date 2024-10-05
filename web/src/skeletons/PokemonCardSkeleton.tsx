import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Pokemon } from '../types/types';

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card
      sx={{
        width: 140,
        borderRadius: '10px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          width="100%"
          style={{
            objectFit: 'contain',
            padding: 6,
          }}
          image={pokemon.imageUrl}
          alt="pokemon"
        />
        <CardContent>
          <Typography>{pokemon.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;
