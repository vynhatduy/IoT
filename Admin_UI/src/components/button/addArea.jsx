import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import AddAreaContent from '../addArea/addAreaContent';
import { useCreateArea } from '../../service/useArea';

const AddArea = ({ onRefresh }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { createArea, loading, error, success } = useCreateArea();

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleCloseResult = () => {
    setOpenResult(false);
    if (isSuccess) {
      handleCloseForm();
      onRefresh?.(); // Gọi hàm reload nếu được truyền từ component cha
    }
  };

  const handleSubmit = async (payload) => {
    const result = await createArea(payload);
    if (result === true) {
      setResultMessage('Tạo khu vực thành công!');
      setIsSuccess(true);
    } else {
      setResultMessage(error || 'Tạo khu vực thất bại!');
      setIsSuccess(false);
    }
    setOpenResult(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenForm} sx={{ width: 150 }}>
        Thêm khu vực
      </Button>

      {/* Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <AddAreaContent onClose={handleCloseForm} onSubmit={handleSubmit} />
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={openResult} onClose={handleCloseResult}>
        <DialogTitle>{isSuccess ? 'Thành công' : 'Thất bại'}</DialogTitle>
        <DialogContent>
          <Typography>{resultMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddArea;
