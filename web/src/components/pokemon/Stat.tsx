import { LinearProgress, Typography } from '@mui/material';
import { StatProp } from '../../types/types';

function Stat({ name, value }: StatProp) {
  return (
    <>
      <Typography>{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={value * 10}
        color="primary"
        sx={(theme) => ({
          marginBottom: 1,
          height: 10,
          borderRadius: 4,
          backgroundColor: theme.palette.grey[300],
        })}
      />
    </>
  );
}

export default Stat;
