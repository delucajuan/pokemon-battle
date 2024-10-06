import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { BattleProps } from '../../types/types';
import useBattle from '../../hooks/useBattle';
import { useEffect, useState } from 'react';
import PokemonBattleCard from './PokemonBattleCard';
import WinnerAlert from './WinnerAlert';

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
      {winnerName && (
        /* XS screens only */
        <Box display={{ xs: 'flex', sm: 'none' }} justifyContent="center" paddingBottom={2}>
          <WinnerAlert winner={winnerName} />
        </Box>
      )}

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PokemonBattleCard
          pokemon={attacker}
          sx={{
            border:
              winnerName === attacker.name
                ? `solid 4px ${theme.palette.success.main}`
                : winnerName
                ? `solid 4px ${theme.palette.error.main}`
                : 'solid 4px transparent',
          }}
        />

        {/* SM and up screens */}
        <Stack
          alignContent="center"
          justifyContent="center"
          display={{ xs: 'none', sm: 'flex' }}
          flexGrow={1}
          position="relative"
        >
          {winnerName && (
            <WinnerAlert
              winner={winnerName}
              sx={{
                position: 'absolute',
                marginBottom: 4,
                bottom: '64%',
              }}
            ></WinnerAlert>
          )}
          <Typography variant="h3" textAlign="center" marginBottom={4}>
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
            sx={{ minWidth: '150px' }}
          >
            Start battle
          </Button>
        </Stack>

        <PokemonBattleCard
          pokemon={defender}
          sx={{
            border:
              winnerName === defender.name
                ? `solid 4px ${theme.palette.success.main}`
                : winnerName
                ? `solid 4px ${theme.palette.error.main}`
                : 'solid 4px transparent',
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
