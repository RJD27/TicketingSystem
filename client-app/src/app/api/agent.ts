import axios, { AxiosResponse } from 'axios';
import { Ticket } from '../models/ticket';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Tickets = {
    list: () => requests.get<Ticket[]>('/tickets'),
    details: (id: string) => requests.get<Ticket>(`/tickets/${id}`),
    create: (ticket: Ticket) => requests.post<void>('/tickets', ticket),
    update: (ticket: Ticket) => axios.put<void>(`/tickets/${ticket.id}`, ticket),
    delete: (id: string) => axios.delete<void>(`/tickets/${id}`)
}

const agent = {
    Tickets
}

export default agent;