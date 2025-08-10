// Auth actions
import * as types from '../actionTypes/authActionTypes';

export const registerRequest = (payload) => ({ type: types.REGISTER_REQUEST, payload });
export const registerSuccess = (payload) => ({ type: types.REGISTER_SUCCESS, payload });
export const registerFailure = (error) => ({ type: types.REGISTER_FAILURE, error });

export const loginRequest = (payload) => ({ type: types.LOGIN_REQUEST, payload });
export const loginSuccess = (payload) => ({ type: types.LOGIN_SUCCESS, payload });
export const loginFailure = (error) => ({ type: types.LOGIN_FAILURE, error });

export const forgotPasswordRequest = (payload) => ({ type: types.FORGOT_PASSWORD_REQUEST, payload });
export const forgotPasswordSuccess = (payload) => ({ type: types.FORGOT_PASSWORD_SUCCESS, payload });
export const forgotPasswordFailure = (error) => ({ type: types.FORGOT_PASSWORD_FAILURE, error });

export const makeRequest = () => ({ type: types.MAKE_REQUEST});
export const makeSuccess = () => ({ type: types.MAKE_SUCCESS });
export const failRequest = (error) => ({ type: types.FAIL_REQUEST, error });

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch(makeRequest());

            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            dispatch(loginSuccess(data));
            dispatch(makeSuccess());

            return data; // Optional: return if caller needs result
        } catch (error) {
            dispatch(makeFailure(error.message));
            throw error;
        }
    };
};
export const  register = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());

            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Auth/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            dispatch(registerSuccess(data));
        } catch (error) {
            dispatch(registerFailure(error.message));
        }
    };
};
export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            dispatch(forgotPasswordRequest());

            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Auth/forgot-password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Forgot password failed');
            }

            dispatch(forgotPasswordSuccess(data.message));
        } catch (error) {
            dispatch(forgotPasswordFailure(error.message));
        }
    };
};