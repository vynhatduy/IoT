import { Container, Typography } from '@mui/material';
import { Button, Stack, TextField, Box } from '@mui/material';
import { Grid } from '@mui/system';
import SelectArea from '../dropdown/selectArea';
import React from 'react';

const AddDevice = (onClose) => {
  const data = [
    { id: 1, title: 'Tên', component: <TextField fullWidth placeholder="Nhập tên..." /> },
    { id: 2, title: 'Chọn khu vực', component: <SelectArea fullWidth /> }
  ];

  return (
    <Container>
      <Typography>Thêm thiết bị</Typography>
      <Box>
        {data.map((item) => (
          <Grid container margin={'16px 0px'} spacing={2} alignItems="center" key={item.id}>
            <Grid item size={2}>
              <Typography variant="subtitle1">{item.title}</Typography>
            </Grid>
            <Grid item size={10}>
              {item.component}
            </Grid>
          </Grid>
        ))}
      </Box>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="warning" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained" color="success">
          Hoàn thành
        </Button>
      </Stack>
    </Container>
  );
};

export default AddDevice;
