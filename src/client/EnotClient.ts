import { Payments } from "../api/payments.js";
import { Payout } from "../api/payout.js";
import { Http } from "../utils/http.js";
import type { SDKOptions } from "../types/index.js";
import type { Request } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { H2H } from "../api/h2h.js";

export class EnotClient {
    private payments: Payments;

    private payout: Payout;

    private baseUrl: string = 'https://api.enot.io';

    private options: SDKOptions;

    private http: Http;

    private h2h: H2H;
    
    constructor (options: SDKOptions) {
        if (!options.apiKey) throw new Error('apiKey is required');
        if (!options.shopId) throw new Error('shopId is required');
        if (!options.secretKey) throw new Error('secretKey is required')

        this.options = options;
        this.http = new Http(options.baseUrl ?? this.baseUrl);

        this.payments = new Payments(this.http, this.options);
        this.payout = new Payout(this.http, this.options);
        this.h2h = new H2H(this.http, this.options);
    }

    /**
     * Запрос на создание h2h
     * @returns {H2H} 
     * @memberof EnotClient
     */
    getH2H (): H2H {
        return this.h2h;
    }
    
    /**
     * Прием платежей
     * @return { Payments } 
     */
    getPayments (): Payments {
        return this.payments;
    }

    /**
     * API Выплат
     * @return { Payout } 
     */
    getPayout (): Payout {
        return this.payout;
    }

    /**
     * Верификация подписи webhook.
     * @param { Request } req - обьект запроса (ExpressJS)
     * @return boolean
     */
    verifySignature (req: Request) : boolean {
        const headerSignature = req.header('x-api-sha256-signature');
        if (!headerSignature) throw new Error('x-api-sha256-signature header is missing');

        if (!req.body || typeof req.body !== 'object') {
            throw new Error('Webhook body is missing or invalid. Use express.json() middleware.');
        }

        const sortedKeys = Object.keys(req.body);
        const sortedBody: Record<string, any> = {};
        sortedKeys.forEach(k => sortedBody[k] = req.body[k]);

        const bodySortedJson = JSON.stringify(sortedBody);

        const calculatedSignature = createHmac('sha256', this.options.secretKey).update(bodySortedJson).digest('hex');
        return timingSafeEqual(
            Buffer.from(calculatedSignature, 'utf8'),
            Buffer.from(headerSignature, 'utf8')
        )
    }
}