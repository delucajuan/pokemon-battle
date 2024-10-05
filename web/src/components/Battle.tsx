import { Button } from '@mui/material';
import { BattleProps } from '../types/types';
import useBattle from '../hooks/useBattle';
import { useEffect, useState } from 'react';

function Battle({ attacker, defender, onWin }: BattleProps) {
  const { mutate, data: battleResult, isSuccess } = useBattle();
  const [activeBattle, setActiveBattle] = useState(false);

  const handleStartBattle = () => {
    if (attacker && defender) {
      setActiveBattle(true);
      mutate({ attackerId: attacker.id, defenderId: defender.id });
    }
  };

  // Trigger onWin once the battle is successful
  useEffect(() => {
    if (isSuccess && battleResult && activeBattle) {
      let winnerName = '';
      if (battleResult.winnerId === battleResult.attacker.id) {
        winnerName = battleResult.attacker.name;
      } else {
        winnerName = battleResult.defender.name;
      }
      onWin(winnerName);
      setActiveBattle(false);
    }
  }, [isSuccess, battleResult, onWin, activeBattle]);

  if (!attacker) {
    return null;
  }
  return (
    <>
      {attacker.name}
      <Button
        onClick={() => {
          handleStartBattle();
        }}
      >
        battle
      </Button>
    </>
  );
}

export default Battle;
