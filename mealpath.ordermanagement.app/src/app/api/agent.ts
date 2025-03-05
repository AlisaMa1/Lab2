import axios, {AxiosError, AxiosResponse} from 'axios';
import { Category } from '../models/category';
import { User, UserFormValues } from '../models/user';
import { toast } from 'react-toastify';
import { useStore } from '../stores/store';
import { store } from '../stores/store';
import { UserRole } from '../models/UserRole';
import { UserList } from '../models/userList';
import CartItem from '../models/cartItem';
import { Product } from '../models/Product';
import { UserRoles } from '../models/UserRoles';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'https://localhost:7155/api/';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    //await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config, headers} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
        if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
            store.userStore.logout();
            toast.error('Session expired - please login again');
            }
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            //navigate('/not-found');
            //window.history.pushState({}, undefined, "/not-found");
            //history.push('/not-found');
            window.location.href = 'not-found';
            
            break;
        case 500:
            console.log(data)
            store.commonStore.setServerError(data);
            window.location.href = '/server-error';
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Categories = {
    list: () => requests.get<Category[]>('/category/all'),
    create: (category: Category) => axios.post<void>('/category', category),
    update: (category: Category) => axios.put<void>(`/category/`, category),
    details: (id: number) => requests.get<Category>(`/category/${id}`)
}

const Account = {
    current: () => requests.get<User>("/account"),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user),
    refreshToken: () => requests.post<User>("/account/refreshToken", {}),
    addUserToRole: (userRole: UserRole) => requests.post<void>("/account/addUserToRole", userRole),
    getAllUsers: () => requests.get<UserList[]>("/account/getallusers"),
    getUserRoles: (id: string) => requests.get<UserRoles[]>("/account/getUserRoles/?userId="+id),
    manageUserRoles: (id: string, userRoles: UserRoles) => requests.post<void>("/account/manageUserRoles?userId="+id, userRoles)
}

const Orders = {
    checkout: (cartItems: Product[]) => requests.post<string>('/payments/checkout', cartItems)
}

const agent = {
    Categories,
    Account,
    Orders
}

export default agent;