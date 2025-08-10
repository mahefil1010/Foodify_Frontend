import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../contexts/AuthContext';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const theme = useTheme();
    const { isAuthenticated ,setIsAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      let error = '';
      if (!value) {
        error = `Please enter your ${name}`;
      } else if (name === 'email' && !emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
      return { ...prev, [name]: error };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formValues.email) {
      errors.email = 'Please enter your email';
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formValues.password) {
      errors.password = 'Please enter your password';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Simulate login success
      setIsAuthenticated(true);
      navigate('/'); // Redirect to dashboard on successful login
      // Redirect or perform further actions here
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!formErrors.email}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={formValues.email}
          name="email"
          onChange={handleChange}
        />
        {formErrors.email && (
          <Typography color="error" variant="caption">{formErrors.email}</Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!formErrors.password}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={formValues.password}
          name="password"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {formErrors.password && (
          <Typography color="error" variant="caption">{formErrors.password}</Typography>
        )}
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
