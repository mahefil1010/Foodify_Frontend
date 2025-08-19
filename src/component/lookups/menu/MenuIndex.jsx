import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, createMenu, updateMenu, deleteMenu } from '../../../redux/actions/menuActions';
import UpsertModal from '../../Common/UpsertModal';
import ConfirmDialog from '../../Common/ConfirmDialog';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const menuFields = [
  { name: 'Name', type: 'text' },
  { name: 'Description', type: 'textarea' },
  { name: 'Price', type: 'number' },
  { name: 'IsAvailable', type: 'checkbox' }
];

const MenuIndex = () => {
  const dispatch = useDispatch();
  const { items, total, loading, error } = useSelector(state => state.menu);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchData = useCallback(() => {
    const params = {
      page: page + 1,
      pageSize,
      search,
      sortField: sortModel[0]?.field,
      sortOrder: sortModel[0]?.sort
    };
    dispatch(fetchMenus(params));
  }, [dispatch, page, pageSize, search, sortModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (row) => {
    setEditData(row);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleUpsert = (data) => {
    if (editData) {
      dispatch(updateMenu({ ...editData, ...data })).then(() => {
        handleModalClose();
        fetchData();
      });
    } else {
      dispatch(createMenu(data)).then(() => {
        handleModalClose();
        fetchData();
      });
    }
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteMenu(deleteId)).then(() => {
      handleConfirmClose();
      fetchData();
    });
  };

  const columns = [
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 2 },
    { field: 'Price', headerName: 'Price', flex: 1, type: 'number' },
    { field: 'IsAvailable', headerName: 'Available', flex: 1, type: 'boolean',
      renderCell: (params) => params.value ? 'Yes' : 'No' },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.Id)}>Delete</Button>
        </>
      ),
      width: 150
    }
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>Add Menu</Button>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
      </Box>
      <DataGrid
        rows={items}
        columns={columns}
        rowCount={total}
        page={page}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={loading}
        getRowId={row => row.Id}
        autoHeight
      />
      <UpsertModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleUpsert}
        fields={menuFields}
        initialValues={editData}
        mode={editData ? 'edit' : 'create'}
        loading={loading}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleConfirmClose}
      />
      {error && <Box color="error.main" mt={2}>{error}</Box>}
    </Box>
  );
};

export default MenuIndex;
