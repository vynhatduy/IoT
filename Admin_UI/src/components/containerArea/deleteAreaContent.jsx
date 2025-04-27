import React, { useState } from 'react';
import { Box, Button, Stack, Grid, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SelectArea from '../dropdown/selectArea';
import { UseDeleteArea } from '../../service/useArea';

const DeleteAreaContent = ({ onClose }) => {
  const [selectedArea, setSelectedArea] = useState('');
  const { deleteArea, loading, error, success } = UseDeleteArea();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleClose = () => {
    if (onClose) onClose?.();
  };

  const handleSubmit = async () => {
    if (selectedArea) {
      const result = await deleteArea(selectedArea?.id || selectedArea); // Tùy SelectArea trả gì
      if (result) {
        setSuccessDialogOpen(true); // Mở dialog thành công
      }
    } else {
      alert('Vui lòng chọn khu vực để xóa!');
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    handleClose(); // Đóng dialog cha
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Xóa khu vực
      </Typography>

      <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2, height: 150 }}>
        <CardContent sx={{ height: '100%', width: 300, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
          <Typography variant="h5">Chọn khu vực</Typography>
          <SelectArea fullWidth onChange={(area) => setSelectedArea(area)} value={selectedArea} />
        </CardContent>
      </Card>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Lỗi: {error}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="contained" color="warning" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </Stack>
      </Box>

      {/* Dialog thông báo thành công */}
      <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Xóa thành công</DialogTitle>
        <DialogContent>
          <Typography>Khu vực đã được xóa thành công!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteAreaContent;
