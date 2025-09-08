import type { CreateH2HInvoice, H2HPaymentParams, H2HPaymentResponse, PaymentResponse, SDKOptions } from "../types/index.js";
import type { Http } from "../utils/http.js";
import { Payments } from "./payments.js";

export class H2H {
    constructor (
        private http: Http,
        private options: SDKOptions
    ) { }

    /**
     * Создание инвойса
     * @param {CreateH2HInvoice} params 
     * @returns {Promise<PaymentResponse>} 
     */
    async createInvoice (params: CreateH2HInvoice): Promise<PaymentResponse> {
        const payments = new Payments(this.http, this.options);

        const invoice = await payments.create({
            ...params
        });
        return invoice;
    }

    /**
     * Создание платежа
     * @param {H2HPaymentParams} params 
     * @returns {Promise<H2HPaymentResponse>} 
     */
    async createH2HPayment (params: H2HPaymentParams): Promise<H2HPaymentResponse> {
        const payload = {
            shop_id: this.options.shopId,
            ...params
        }
        return this.http.post<H2HPaymentResponse>('/invoice/h2h', payload);
    }
}