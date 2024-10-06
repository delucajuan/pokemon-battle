import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { PokemonMiniCardProps } from '../../types/types';

function PokemonMiniCard({ pokemon, onClick }: PokemonMiniCardProps) {
  return (
    <Card
      sx={{
        width: { xs: 130, sm: 140 },
        borderRadius: '10px',
      }}
    >
      <CardActionArea onClick={() => onClick(pokemon)}>
        <CardMedia
          component="img"
          width="100%"
          style={{
            objectFit: 'contain',
            padding: '8px',
          }}
          image={pokemon.imageUrl}
          alt={pokemon.name}
        />
        <CardContent sx={{ paddingY: 1 }}>
          <Typography textAlign="center">{pokemon.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonMiniCard;
