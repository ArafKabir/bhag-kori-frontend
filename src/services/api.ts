import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../context/AuthContext';

const BASE_URL =
    process.env.API_URL ?? 'https://bhag-kori-web-afh8etd3d5geb0ae.canadacentral-01.azurewebsites.net/api/v1/';


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
    api.post('user/login', { email, password });

export const signUp = (email: string, phone: string, name: string, password: string ) =>
    api.post('user/create', { email, phone, name, password });

export const fetchFriends = () =>
    api.get<Friend[]>('/friends').then(r => r.data);

export const fetchGroupsByUser = async (userId: number) => {
  const response = await api.get(`room/get/user/${userId}`);
  return response.data;
};

export const fetchUserBalanceByGroup = async (groupId: number, userId: number) => {
  const response = await api.get(`room/get/${groupId}/total/user/${userId}`);
  return response.data;
}

export const createGroup = async (
  name: string,
  description: string,
  creatorId: number
) => {
  const newGroup = {
    id: null,
    name,
    description,
    createTime: new Date().toISOString(),
    creatorId,
    memberIds: [],
  };

  const response = await api.post('room/create', newGroup);
  return response.data;
};

export const createGroupWithMembers = async (
  name: string,
  description: string,
  creatorId: number,
  emails: string[]
) => {
  const newGroup = {
    roomDto: {
      id: null,
      name,
      description,
      createTime: new Date().toISOString(),
      creatorId,
      memberIds: [],
    },
    emails,
  };

  const response = await api.post('room/create/new', newGroup);
  return response.data;
};

export const fetchAllExpensesByGroupId = async (groupId: number) => {
  const response = await api.get(`expense/get/room/${groupId}`)
  return response.data;
}

/* Types */
export interface Friend {
    id: number;
    username: string;
    avatarUrl: string;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    createTime: string;
    creatorId: number;
    memberIds: number[];
}

export interface Expense {
  id: number;
  name: string;
  createTime: string,
  payerId: number,
  roomId: number,
  amount: number,
  splitType: string
}

export default api;
