import { Alert, AlertTitle, SxProps } from '@mui/material';

function WinnerAlert({ winner, sx }: { winner: string; sx?: SxProps }) {
  return (
    <Alert
      icon={false}
      variant="filled"
      color="success"
      sx={{
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
        ...sx,
      }}
    >
      <AlertTitle variant="h6" margin={0}>
        {winner} wins!
      </AlertTitle>
    </Alert>
  );
}

export default WinnerAlert;
