import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { BattleProps } from '../types/types';
import useBattle from '../hooks/useBattle';
import { useEffect, useState } from 'react';
import PokemonBattleCard from './PokemonBattleCard';

function Battle({ attacker, defender, winnerName, setWinnerName }: BattleProps) {
  const { mutate, data: battleResult, isSuccess } = useBattle();
  const [activeBattle, setActiveBattle] = useState(false);
  const theme = useTheme();

  const handleStartBattle = () => {
    if (attacker && defender) {
      setActiveBattle(true);
      mutate({ attackerId: attacker.id, defenderId: defender.id });
    }
  };

  // Set winner name once the battle is successful
  useEffect(() => {
    if (isSuccess && battleResult && activeBattle) {
      if (battleResult.winnerId === battleResult.attacker.id) {
        setWinnerName(battleResult.attacker.name);
      } else {
        setWinnerName(battleResult.defender.name);
      }
      setActiveBattle(false);
    }
  }, [isSuccess, battleResult, setWinnerName, activeBattle]);

  if (!attacker || !defender) {
    return null;
  }
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PokemonBattleCard
          pokemon={attacker}
          sx={{
            border:
              winnerName === attacker.name
                ? `solid 4px ${theme.palette.success.main}`
                : winnerName
                ? `solid 4px ${theme.palette.error.main}`
                : 'none',
          }}
        />
        <Box alignContent="center" display={{ xs: 'none', sm: 'unset' }}>
          <Typography variant="h3" textAlign="center" margin={4}>
            VS
          </Typography>
          <Button
            disabled={!!winnerName}
            variant="contained"
            color="secondary"
            onClick={() => {
              handleStartBattle();
            }}
            size="large"
          >
            Start battle
          </Button>
        </Box>
        <PokemonBattleCard
          pokemon={defender}
          sx={{
            border:
              winnerName === defender.name
                ? `solid 4px ${theme.palette.success.main}`
                : winnerName
                ? `solid 4px ${theme.palette.error.main}`
                : 'none',
          }}
        />
      </Stack>
      <Button
        disabled={!!winnerName}
        variant="contained"
        color="secondary"
        onClick={() => {
          handleStartBattle();
        }}
        size="medium"
        fullWidth
        sx={{ display: { sm: 'none' }, marginTop: 2 }}
      >
        Start battle
      </Button>
    </>
  );
}

export default Battle;
