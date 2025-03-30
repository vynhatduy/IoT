import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Material-UI
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid'; // 🔹 Sửa lại import Grid
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Project imports
import IconButton from '../../components/@extended/IconButton';
import AnimateButton from '../../components/@extended/AnimateButton';

// Assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // 🔹 Sửa import icon
import { useLogin } from '../../service/useAuth';

export default function AuthLogin({ isDemo = false }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 🔹 Thêm state hiển thị mật khẩu
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Email không hợp lệ').max(255).required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu').max(50, 'Mật khẩu tối đa 50 ký tự')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await login(values.email, values.password);

          if (response) {
            setErrorMessage('');
            navigate('/admin/dashboard'); // 🔹 Chuyển hướng nếu đăng nhập thành công
          } else {
            setErrorMessage('Email hoặc mật khẩu không đúng.');
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
        setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, touched, values, handleSubmit, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="email-login">Email</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập email"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            <Grid item xs={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Typography color="error">{errorMessage}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button fullWidth size="large" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
