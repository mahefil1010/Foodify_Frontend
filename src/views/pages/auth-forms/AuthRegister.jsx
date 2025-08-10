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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authActions';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const theme = useTheme();
const dispatch = useDispatch();
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      let error = '';
      if (!value) {
        if (name === 'firstName') error = 'Please enter your first name';
        else if (name === 'lastName') error = 'Please enter your last name';
        else if (name === 'email') error = 'Please enter your email';
        else if (name === 'password') error = 'Please enter your password';
        else if (name === 'confirmPassword') error = 'Please confirm your password';
      } else if (name === 'email' && !emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      } else if (name === 'confirmPassword' && value !== formValues.password) {
        error = 'Passwords do not match';
      } else if (name === 'password' && formValues.confirmPassword && value !== formValues.confirmPassword) {
        error = 'Passwords do not match';
      }
      return { ...prev, [name]: error, ...(name === 'password' ? { confirmPassword: (formValues.confirmPassword && value !== formValues.confirmPassword) ? 'Passwords do not match' : '' } : {}) };
    });
  };


  const validateForm = () => { let errors = {};
    if (!formValues.firstName) errors.firstName = 'Please enter your first name';
    if (!formValues.lastName) errors.lastName = 'Please enter your last name';
    if (!formValues.email) errors.email = 'Please enter your email';
    else if (!emailRegex.test(formValues.email)) errors.email = 'Please enter a valid email address';
    if (!formValues.password) errors.password = 'Please enter your password';
    if (!formValues.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (formValues.password !== formValues.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const response= await dispatch(register(formValues));
    if (response) {
      navigate('/page/login'); // Redirect to dashboard on successful registration
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            name="firstName"
            type="text"
            value={formValues.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            name="lastName"
            type="text"
            value={formValues.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
      </Grid>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!formErrors.email}>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
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
        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? 'text' : 'password'}
          value={formValues.password}
          name="password"
          onChange={handleChange}
          label="Password"
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
        />
        {formErrors.password && (
          <Typography color="error" variant="caption">{formErrors.password}</Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!formErrors.confirmPassword}>
        <InputLabel htmlFor="outlined-adornment-confirm-password-register">Confirm Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password-register"
          type={showPassword ? 'text' : 'password'}
          value={formValues.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          label="Confirm Password"
        />
        {formErrors.confirmPassword && (
          <Typography color="error" variant="caption">{formErrors.confirmPassword}</Typography>
        )}
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label={
              <Typography variant="subtitle1">
                Agree with &nbsp;
                <Typography variant="subtitle1" component={Link} to="#">
                  Terms & Condition.
                </Typography>
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
