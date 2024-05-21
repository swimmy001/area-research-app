import { CSVLink, CSVLinkProps } from 'react-csv';
import { DownloadFileProps } from '../types/types';
import { Button } from '@mui/material';

const DownloadFile: React.FC<DownloadFileProps> = ({schools, inputValues}) => {
  const csvData: string[][] = [
    ["名前", "距離", "生徒数", "住所", "緯度", "経度", "校種"],
    ...schools.map((school) => [
      school.name,
      String(school.distance),
      String(school.students),
      school.address,
      String(school.lat),
      String(school.lng),
      school.kind_of_school,
    ]),
  ];

  const csvLinkProps: CSVLinkProps = {
    data: csvData,
    filename: `${inputValues.target}から半径${inputValues.radius}km圏内の${inputValues.kind}.csv`,
  };

  return (
      <Button variant="contained"
        type="submit"
        sx={{ width: '200px' }}
      >
        <CSVLink {...csvLinkProps} >
          CSVダウンロード
        </CSVLink>
      </Button>
  );
};

export default DownloadFile;
