import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import useArea from '../../service/useArea';

export default function SelectArea({ onChange }) {
  // Nhận onChange từ props
  const [area, setKhuVuc] = React.useState('');
  const { areas, loading, error } = useArea();

  const handleChange = (event) => {
    const selectedArea = event.target.value;
    setKhuVuc(selectedArea);
    onChange(selectedArea); // Truyền giá trị ra ngoài component cha
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Lỗi tải dữ liệu: {error}</Alert>;

  return (
    <FormControl fullWidth sx={{ minWidth: 120 }}>
      <InputLabel id="select-area-label">Khu vực</InputLabel>
      <Select labelId="select-area-label" id="select-area" value={area} onChange={handleChange} label="Khu vực">
        {areas.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
