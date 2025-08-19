import * as types from '../actionTypes/menuActionTypes';

export const menuListRequest = (params) => ({ type: types.MENU_LIST_REQUEST, params });
export const menuListSuccess = (payload) => ({ type: types.MENU_LIST_SUCCESS, payload });
export const menuListFailure = (error) => ({ type: types.MENU_LIST_FAILURE, error });

export const menuCreateRequest = (payload) => ({ type: types.MENU_CREATE_REQUEST, payload });
export const menuCreateSuccess = (payload) => ({ type: types.MENU_CREATE_SUCCESS, payload });
export const menuCreateFailure = (error) => ({ type: types.MENU_CREATE_FAILURE, error });

export const menuUpdateRequest = (payload) => ({ type: types.MENU_UPDATE_REQUEST, payload });
export const menuUpdateSuccess = (payload) => ({ type: types.MENU_UPDATE_SUCCESS, payload });
export const menuUpdateFailure = (error) => ({ type: types.MENU_UPDATE_FAILURE, error });

export const menuDeleteRequest = (id) => ({ type: types.MENU_DELETE_REQUEST, id });
export const menuDeleteSuccess = (id) => ({ type: types.MENU_DELETE_SUCCESS, id });
export const menuDeleteFailure = (error) => ({ type: types.MENU_DELETE_FAILURE, error });

// Thunks for API calls (no service, direct fetch)
export const fetchMenus = (params) => {
    return async (dispatch) => {
        dispatch(menuListRequest(params));
        try {
            const query = new URLSearchParams(params).toString();
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Menu?${query}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch menus');
            dispatch(menuListSuccess(data));
        } catch (error) {
            dispatch(menuListFailure(error.message));
        }
    };
};

export const createMenu = (menu) => {
    return async (dispatch) => {
        dispatch(menuCreateRequest(menu));
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menu)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to create menu');
            dispatch(menuCreateSuccess(data));
        } catch (error) {
            dispatch(menuCreateFailure(error.message));
        }
    };
};

export const updateMenu = (menu) => {
    return async (dispatch) => {
        dispatch(menuUpdateRequest(menu));
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Menu/${menu.Id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menu)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update menu');
            dispatch(menuUpdateSuccess(data));
        } catch (error) {
            dispatch(menuUpdateFailure(error.message));
        }
    };
};

export const deleteMenu = (id) => {
    return async (dispatch) => {
        dispatch(menuDeleteRequest(id));
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Menu/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete menu');
            dispatch(menuDeleteSuccess(id));
        } catch (error) {
            dispatch(menuDeleteFailure(error.message));
        }
    };
};
