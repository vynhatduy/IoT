import React, { useState } from 'react';
import { Box, Button, Stack, Grid, Typography, Card, CardContent } from '@mui/material';
import SelectArea from '../dropdown/selectArea';

const DeleteAreaContent = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    topic: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {};

  const formFields = [{ id: 1, title: 'Chọn Khu vực', component: <SelectArea /> }];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Xóa khu vực
      </Typography>

      <Box>
        {formFields.map((item) => (
          <Card key={item.id} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  {item.component}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="warning" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Xóa
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeleteAreaContent;
