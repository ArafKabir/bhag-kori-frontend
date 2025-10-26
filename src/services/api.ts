import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../context/AuthContext';

const BASE_URL =
    process.env.API_URL ?? 'https://bhag-kori-web-afh8etd3d5geb0ae.canadacentral-01.azurewebsites.net';


const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    async (err: AxiosError) => {
        if (err.response?.status === 401) {
            // clear token and redirect to login
            await AsyncStorage.removeItem('token');
            // You can also expose logout via AuthContext:
            // AuthContext.dispatch({ type: 'LOGOUT' });
        }
        return Promise.reject(err);
    },
);


export const loginRequest = (email: string, password: string) =>
    api.post<{ token: string }>('/login', { email, password });

export const signUp = (email: string, phone: string, name: string, password: string ) =>
    api.post('/create', { email, phone, name, password });

export const fetchFriends = () =>
    api.get<Friend[]>('/friends').then(r => r.data);

export const fetchGroups = () =>
    api.get<Group[]>('/groups').then(r => r.data);

/* Types */
export interface Friend {
    id: number;
    username: string;
    avatarUrl: string;
}

export interface Group {
    id: number;
    name: string;
    balance: number;
}

export default api;
