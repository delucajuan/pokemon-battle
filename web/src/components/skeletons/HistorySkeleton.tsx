import { Skeleton, Typography } from '@mui/material';

function HistorySkeleton() {
  return (
    <>
      <Skeleton>
        <Typography variant="h5" gutterBottom>
          Recent battles
        </Typography>
      </Skeleton>
      <Skeleton variant="rounded" width={768} height={366} sx={{ maxWidth: '100%' }} />
    </>
  );
}

export default HistorySkeleton;
