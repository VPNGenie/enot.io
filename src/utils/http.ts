import type { AxiosInstance } from "axios";
import type { SDKOptions } from "../types/index.js";
import axios from "axios";

export class Http {
    private axios: AxiosInstance

    constructor (
        baseUrl: string,
        options?: SDKOptions 
    ) {
        this.axios = axios.create({
            baseURL: baseUrl,
            timeout: options?.timeout ?? 5000,
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': options?.apiKey 
            }
        })
    }

    async get<T = any> (url: string) {
        const response = await this.axios.get<T>(url);

        return response.data;
    }

    async post<T = any> (url: string, body?: any) {
        const response = await this.axios.post<T>(url, body);

        return response.data;
    }
}