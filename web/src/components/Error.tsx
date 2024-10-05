import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingY="25vh"
      marginX="auto"
      maxWidth={360}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, opacity: 0.7 }} />

      <Typography marginBottom={2} sx={{ opacity: 0.6 }}>
        Server error. Please try again later.
      </Typography>

      <Button variant="text" onClick={handleReload}>
        Reload
      </Button>
    </Box>
  );
}

export default Error;
