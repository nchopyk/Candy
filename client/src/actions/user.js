import axios from 'axios';
import {setUserAction, logoutAction} from '../reducers/userReducer';
import {hideLoader, showLoader} from '../reducers/appReducer';
import AuthService from '../service/AuthService';
import {API_URL} from '../http';

export const registration = (formData) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const { username, email, password } = formData;
        const response = await AuthService.registration(username, email, password);
        dispatch(setUserAction(response.data.user));
        localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
        alert(e.response?.data?.message);
    } finally {
        dispatch(hideLoader());
    }
};

export const login = (formData) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const { email, password } = formData;
        const response = await AuthService.login(email, password);
        dispatch(setUserAction(response.data.user));
        localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
        alert(e.response?.data?.message);
    } finally {
        dispatch(hideLoader());
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        await AuthService.logout();
        dispatch(logoutAction());
        localStorage.removeItem('token');
    } catch (e) {
        alert(e.response?.data?.message);
    } finally {
        dispatch(hideLoader());
    }
};

export const checkAuth = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios.get(`${API_URL}/auth/refresh`,
            { withCredentials: true });
        dispatch(setUserAction(response.data.user));
        localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
        alert(e.response?.data?.message);
    } finally {
        dispatch(hideLoader());
    }
};
