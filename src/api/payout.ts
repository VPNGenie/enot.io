import type { BalanceResponse, PayoutInfoParams, PayoutInfoResponse, SBPBankListResponse, SDKOptions } from "../types/index.js";
import type { Http } from "../utils/http.js";

export class Payout {
    constructor (
        private http: Http,
        private options: SDKOptions
    ) { }

    /**
     * Получение баланса
     * @param {string} userId 
     * @returns {Promise<BalanceResponse>} 
     */
    async getBalance (userId: string): Promise<BalanceResponse> {
        if (!userId) throw new Error('userId is required');
        
        return this.http.get<BalanceResponse>(`/account/users/${userId}/balance`);
    }

    async create () {

    }

    /**
     * Получение информации о выводе
     * @param {PayoutInfoParams} params 
     * @returns {Promise<PayoutInfoResponse>} 
     */
    async getInfo (params: PayoutInfoParams): Promise<PayoutInfoResponse> {
        const { id, order_id } = params;

        if (!id && !order_id) throw new Error('id or order_id is required');

        const query = new URLSearchParams();
        if (id) query.append('id', id);
        if (order_id) query.append('order_id', order_id);

        return this.http.get<PayoutInfoResponse>(`/payoff/info?${query.toString()}`);
    }

    /**
     * Получение списка доступных банков для вывода через СБП
     * @param {string} userId 
     * @returns {Promise<SBPBankListResponse>} 
     */
    async getSBPBankList (userId: string): Promise<SBPBankListResponse> {
        if (!userId) throw new Error('userId is required');

        return this.http.get<SBPBankListResponse>(`/payoff/get-sbp-bank-list?user_id=${userId}`);
    }
}