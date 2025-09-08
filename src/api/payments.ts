import type { 
    CreatePaymentParams, 
    GetPaymentParams, 
    PaymentInfoResponse,
    PaymentResponse, 
    PaymentTariffsResponse, 
    SDKOptions 
} from "../types/index.js";
import type { Http } from "../utils/http.js";

export class Payments {

    constructor (
        private http: Http,
        private options: SDKOptions
    ) { }

    /**
     * Создание платежа
     * @param {CreatePaymentParams} params 
     * @returns {Promise<PaymentResponse>} 
     */
    async create (params: CreatePaymentParams): Promise<PaymentResponse> {
        const payload: Record<string, any> = {
            ...params,
            shop_id: this.options.shopId
        }

        if (this.options.hook_url) payload.hook_url = this.options.hook_url;
        if (this.options.fail_url) payload.fail_url = this.options.fail_url;
        if (this.options.success_url) payload.success_url = this.options.success_url;
        
        return this.http.post<PaymentResponse>('/invoice/create', payload);
    }

    /**
     * Получение доступных методов оплаты
     * @returns {Promise<PaymentTariffsResponse>} 
     */
    async getPaymentTariffs (): Promise<PaymentTariffsResponse> {
        return this.http.get<PaymentTariffsResponse>(`/shops/${this.options.shopId}/payment-tariffs`);
    }

    /**
     * Получение информации об оплате
     * @param {Omit<GetPaymentParams, 'shop_id'>} params 
     * @returns {Promise<PaymentInfoResponse>} 
     */
    async getInfo (params: Omit<GetPaymentParams, 'shop_id'>): Promise<PaymentInfoResponse> {
        const { invoice_id, order_id } = params;

        if (!invoice_id && !order_id) throw new Error('invoice_id or order_id is required');

        const query = new URLSearchParams();
        query.append('shop_id', this.options.shopId);
        if (invoice_id) query.append('invoice_id', invoice_id);
        if (order_id) query.append('order_id', order_id);

        return this.http.get<PaymentInfoResponse>(`/invoice/info?${query.toString()}`);
    }
}