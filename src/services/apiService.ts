import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { map, retryWhen, delay,take } from 'rxjs/operators';
import {defer, Observable} from 'rxjs'

const RETRY_ATTEMPTS = 3
const RETRY_DELAY = 1000 


const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    /*
        Add default headers, interceptors etc..
    */

    return axiosInstance;
};
const axiosInstance = initialization(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
    return defer(()=> axiosInstance.get<T>(url, { params: queryParams }))
        .pipe(map(result => result.data),
        retryWhen(errors => errors.pipe(delay(RETRY_DELAY), take(RETRY_ATTEMPTS))));
}

export default { get }