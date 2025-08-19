// UpsertModal.jsx
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

const UpsertModal = ({ open, onClose, onSubmit, fields, initialValues = {}, mode = 'create', loading }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValues || {});
    setErrors({});
  }, [initialValues, open]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    fields.forEach(f => {
      if (f.name === 'Name' && !form.Name) errs.Name = 'Name is required';
      if (f.name === 'Price' && (form.Price === undefined || form.Price === '' || Number(form.Price) <= 0)) errs.Price = 'Price must be > 0';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Menu Item' : 'Create Menu Item'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {fields.map((field) => {
            if (field.type === 'text' || field.type === 'number') {
              return (
                <TextField
                  key={field.name}
                  label={field.name}
                  type={field.type}
                  value={form[field.name] ?? ''}
                  onChange={e => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  fullWidth
                  required={field.name === 'Name' || field.name === 'Price'}
                />
              );
            }
            if (field.type === 'textarea') {
              return (
                <TextField
                  key={field.name}
                  label={field.name}
                  value={form[field.name] ?? ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
              );
            }
            if (field.type === 'checkbox') {
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <Checkbox
                      checked={!!form[field.name]}
                      onChange={e => handleChange(field.name, e.target.checked)}
                    />
                  }
                  label={field.name}
                />
              );
            }
            return null;
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {mode === 'edit' ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertModal;
