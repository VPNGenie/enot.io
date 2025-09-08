import type { PaymentStatus } from "../constants/statuses.js"

export interface SDKOptions {
    apiKey: string, // API ключ магазина
    shopId: string, // Идентификатор кассы (используется для авторизации)
    secretKey: string, // Секретный ключ для webhook
    timeout?: number
    baseUrl?: string,
    hook_url?: string, // URL для отправки webhook
    success_url?: string, // URL для переадресовки пользователя при успешной оплате.
    fail_url?: string // URL для переадресовки пользователя при ошибке при оплате

}

export interface GetPaymentParams {
    invoice_id?: string, // ID транзакции 
    order_id?: string // Уникальный идентификатор платежа в системе мерча
}

export interface PaymentInfoResponse {
    invoice_id: string; // ID операции в нашей системе
    order_id: string; // ID операции в вашей системе
    shop_id: string; // ID кассы
    status: PaymentStatus; // Статус транзакции 
    invoice_amount?: number; // Сумма платежа
    credited: number | null; // Сумма зачисление на баланс
    currency: string; // Валюта платежа
    pay_service: string | null; // Метод оплаты (В случае успеха)
    payer_details: string | null; // Реквизиты плательщика (Может быть пустым)
    commission_amount: number; // Общая комиссия в рублях
    commission_percent: number; // Общая комиссия в процентах
    shop_commission_amount: number; // Сумма комиссии c кассы
    user_commission_amount: number; // Сумма комиссии, взимаемая с клиента
    user_commission_percent: number; // Процент комиссии, взимаемый с клиента
    custom_field?: Record<string, any>; // Строка, которую вы передавали в параметрах при создании платежа
    created_at: string; // Время создания инвойса
    expired_at: string; // Время истечения времени жизни
    paid_at: string; // Время оплаты инвойса
}

export interface CreatePaymentParams {
    amount: number, // Сумма к оплате.
    order_id: string, // ID платежа в вашей системе
    currency?: string, // Валюта платежа
    custom_fields?: string[],
    comment?: string,
}

export interface PaymentResponse {
    id: string, // ID операции в нашей системе
    amount: string, // Сумма инвойса (в рублях)
    currency: string, // Валюта платежа
    url: string, // Ссылка на форму оплаты
    expired: string // {'Время завершения инвойса в формате “Y‑m‑d H:i:s”'}
}

// Элемент массива
export interface PaymentTariff {
    percent: number; // Общий процент комиссии
    fix: number; // Фиксированная коммиссия
    min_sum: number; // Минимальная сумма оплаты
    max_sum: number; // Максимальная сумма оплаты
    shop_percnet: number; // Процент комиссии, взимаемый с кассы
    user_percent: number; // Процент комиссии, взимаемый с клиента
    service: string; // Код метода оплаты
    service_label: string; // Название метода оплаты
    currency: string; // Валюта
    status: PaymentTariffStatus // Статус тарифа
}

// Статусы тарифа
export type PaymentTariffStatus = 'enabled' | 'disabled';

// Массив тарифов
export interface PaymentTariffsResponse {
    tariffs: PaymentTariff[]
}

export interface BalanceResponse {
    balance: number, // Общий баланс
    active_balance: number, // Баланс доступный для вывода
    freeze_balance: number // Баланс в заморозке
}

export interface SBPBank {
    id: string, // ID банка в системе быстрых платежей (СБП)
    name: string // Наименование банка
}

export interface SBPBankListResponse {
    banls: SBPBank[]
}

export interface PayoutInfoParams {
    user_id: string,
    id?: string,
    order_id?: string
}

export interface PayoutInfoResponse {
    
}

export interface CreateH2HInvoiceFields {
    type: 'direct' | 'link',
    include_service: string[]
}

export type CreateH2HInvoice = CreatePaymentParams & Partial<CreateH2HInvoiceFields>

export interface H2HPaymentParams {
    invoice_id: string,
    ip: string,
    user_agent: string,
    payment_data: {
        bank: 'sber' | 'tinkoff'
    }
}

export interface H2HPaymentResponse {
    data: {
        step_two_type: string,
        wallet: string,
        receiver_name: string,
        bank: string,
        amount: string,
        time_end: string,
        url: string | null,
        type: string,
        is_redirect: boolean,
        fingerprint: boolean,
        is_need_get_info: boolean
    },
    status: number,
    status_check: boolean
}