import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClientPort } from '../../core/ports/http/HttpClientPort';
import ENV from '../../config/env';

export class HttpClientAdapter implements HttpClientPort {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: ENV.API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Handle unauthorized
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get(url, config);
        return response.data.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post(url, data, config);
        return response.data.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put(url, data, config);
        return response.data.data;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.patch(url, data, config);
        return response.data.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete(url, config);
        return response.data.data;
    }
}