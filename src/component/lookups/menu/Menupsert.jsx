import React from 'react';
import UpsertModal from '../../Common/UpsertModal';

const menuFields = [
  { name: 'Name', type: 'text' },
  { name: 'Description', type: 'textarea' },
  { name: 'Price', type: 'number' },
  { name: 'IsAvailable', type: 'checkbox' }
];

const Menupsert = ({ open, onClose, onSubmit, initialValues, mode, loading }) => {
  return (
    <UpsertModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      fields={menuFields}
      initialValues={initialValues}
      mode={mode}
      loading={loading}
    />
  );
};

export default Menupsert;
