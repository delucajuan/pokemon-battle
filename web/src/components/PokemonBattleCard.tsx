import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PokemonBattleCardProps } from '../types/types';
import Stat from './Stat';

function PokemonBattleCard({ pokemon, ...cardProps }: PokemonBattleCardProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Card
      {...cardProps}
      sx={{
        width: 280,
        borderRadius: '10px',
        ...cardProps.sx,
      }}
    >
      <CardMedia
        component="img"
        width="100%"
        style={{
          objectFit: 'contain',
          padding: 8,
        }}
        image={pokemon.imageUrl}
        alt="pokemon"
      />
      <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
        <Typography variant={isXs ? 'h6' : 'h5'} textAlign="center">
          {pokemon.name}
        </Typography>
        <Divider sx={{ margin: 1 }} />
        <Stat name="HP" value={pokemon.hp} />
        <Stat name="Attack" value={pokemon.attack} />
        <Stat name="Defense" value={pokemon.defense} />
        <Stat name="Speed" value={pokemon.speed} />
      </CardContent>
    </Card>
  );
}

export default PokemonBattleCard;
