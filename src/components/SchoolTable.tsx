import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SchoolTableProps } from '../types/types';
import { Typography } from '@mui/material';

function createData(
  name: string,
  distance: number,
  students: number,
) {
  return { name, distance, students };
}

export default function SchoolTable({ schools, inputValues }: SchoolTableProps) {
  const rows = schools.map((school) => {
    return createData(school.name, Number(school.students), school.distance);
  });
  const totalStudents = schools.reduce((acc, school) => acc + Number(school.students), 0);
  return (
    <>
      <Typography sx={{mb: 2}}>{inputValues.target}から半径{inputValues.radius}km内の{inputValues.kind}（計{schools.length}校）</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="school table">
          <TableHead>
            <TableRow>
              <TableCell>学校名</TableCell>
              <TableCell align="right">距離(km)</TableCell>
              <TableCell align="right">生徒数&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.students}</TableCell>
                <TableCell align="right">{row.distance}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>合計</TableCell>
              <TableCell align="right">{totalStudents}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
