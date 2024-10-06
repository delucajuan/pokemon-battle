import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Battle } from '../../types/types';

function History({ battles }: { battles: Battle[] }) {
  const theme = useTheme();
  const primary = theme.palette.primary;
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: primary.light }}>
            <TableCell
              sx={{
                color: primary.contrastText,
                fontWeight: 800,
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                color: primary.contrastText,
                fontWeight: 800,
              }}
              align="right"
            >
              Attacker
            </TableCell>
            <TableCell
              sx={{
                color: primary.contrastText,
                fontWeight: 800,
              }}
              align="right"
            >
              Defender
            </TableCell>
            <TableCell
              sx={(theme) => ({
                color: theme.palette.secondary.contrastText,
                fontWeight: 800,
              })}
              align="right"
            >
              Winner
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {battles?.map((battle) => (
            <TableRow
              key={battle.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(battle.battleDate).toLocaleString()}
              </TableCell>
              <TableCell align="right">{battle.attacker.name}</TableCell>
              <TableCell align="right">{battle.defender.name}</TableCell>
              <TableCell align="right">
                {battle.attacker.id === battle.winnerId
                  ? battle.attacker.name
                  : battle.defender.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default History;
