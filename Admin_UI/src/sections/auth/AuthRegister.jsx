import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
// project imports
import IconButton from '../../components/@extended/IconButton';
import AnimateButton from '../../components/@extended/AnimateButton';

import { useCreateAdmin } from '../../service/useAuth';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Lưu trữ lỗi từ API
  const { createAdmin, loading } = useCreateAdmin();
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra validation
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await createAdmin({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        password: formData.password
      });

      if (result) {
        // Nếu thành công, chuyển hướng đến trang đăng nhập
        navigate('/login');
      } else {
        // Nếu thất bại, hiển thị thông báo lỗi
        setError('Đã có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstname) {
      errors.firstname = 'First Name is required';
    }
    if (!data.lastname) {
      errors.lastname = 'Last Name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (!data.address) {
      errors.address = 'Address is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="firstname-signup">Tên*</InputLabel>
              <OutlinedInput
                id="firstname-signup"
                type="text"
                value={formData.firstname}
                name="firstname"
                onChange={handleChange}
                placeholder="Nghia"
                fullWidth
                error={Boolean(formErrors.firstname)}
              />
            </Stack>
            {formErrors.firstname && <FormHelperText error>{formErrors.firstname}</FormHelperText>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="lastname-signup">Họ*</InputLabel>
              <OutlinedInput
                id="lastname-signup"
                type="text"
                value={formData.lastname}
                name="lastname"
                onChange={handleChange}
                placeholder="Le"
                fullWidth
                error={Boolean(formErrors.lastname)}
              />
            </Stack>
            {formErrors.lastname && <FormHelperText error>{formErrors.lastname}</FormHelperText>}
          </Grid>

          <Grid item xs={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="email-signup">Địa chỉ Email*</InputLabel>
              <OutlinedInput
                id="email-signup"
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="2113005@dlu.edu.vn"
                fullWidth
                error={Boolean(formErrors.email)}
              />
            </Stack>
            {formErrors.email && <FormHelperText error>{formErrors.email}</FormHelperText>}
          </Grid>

          <Grid item xs={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="phoneNumber-signup">Số điện thoại*</InputLabel>
              <OutlinedInput
                id="phoneNumber-signup"
                type="text"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                placeholder="0987654321"
                fullWidth
                error={Boolean(formErrors.phoneNumber)}
              />
            </Stack>
            {formErrors.phoneNumber && <FormHelperText error>{formErrors.phoneNumber}</FormHelperText>}
          </Grid>

          <Grid item xs={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="address-signup">Địa chỉ*</InputLabel>
              <OutlinedInput
                id="address-signup"
                type="text"
                value={formData.address}
                name="address"
                onChange={handleChange}
                placeholder="123 Main St."
                fullWidth
                error={Boolean(formErrors.address)}
              />
            </Stack>
            {formErrors.address && <FormHelperText error>{formErrors.address}</FormHelperText>}
          </Grid>

          <Grid item xs={12}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="password-signup">Mật khẩu</InputLabel>
              <OutlinedInput
                id="password-signup"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="******"
                fullWidth
                error={Boolean(formErrors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <PanoramaFishEyeIcon /> : <RemoveRedEyeIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
            {formErrors.password && <FormHelperText error>{formErrors.password}</FormHelperText>}
          </Grid>

          {error && (
            <Grid item xs={12}>
              <FormHelperText error>{error}</FormHelperText>
            </Grid>
          )}

          <Grid item xs={12}>
            <AnimateButton>
              <Button fullWidth size="large" variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? 'Đang tạo...' : 'Đăng ký'}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
