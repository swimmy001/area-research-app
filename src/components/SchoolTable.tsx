import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SchoolTableProps } from '../types/types';
import { Typography } from '@mui/material';
import DownloadFile from './DownloadFile';

function createData(
  name: string,
  distance: number,
  students: number | string,
  url: string
) {
  return { name, distance, students, url };
}

export default function SchoolTable({ schools, inputValues }: SchoolTableProps) {
  const rows = schools.map((school) => {
    const studentCount = isNaN(Number(school.students)) ? "不明" : Number(school.students);
    return createData(school.name, school.distance, studentCount, school.url);
  });

  const totalStudents = schools.reduce((acc, school) => {
    const studentCount = isNaN(Number(school.students)) ? 0 : Number(school.students);
    return acc + studentCount;
  }, 0);

  return (
    <>
      <Typography sx={{fontSize: '1.2rem', mb: 2}}>
        {inputValues.target}から半径{inputValues.radius}km内の{inputValues.kind}（計{schools.length}校）
      </Typography>
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
                <TableCell component="th" scope="row" onClick={()=>window.open(row.url, '_blank', 'noopener,noreferrer')} className="hover:bg-gray-100 cursor-pointer">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.distance}</TableCell>
                <TableCell align="right">{typeof row.students === 'number' ? row.students : "不明"}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>合計</TableCell>
              <TableCell align="right">{totalStudents}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-5">
        <DownloadFile schools={schools} inputValues={inputValues}/>
      </div>
    </>
  );
}
