export interface Currency {
    code: number, // Код валюты
    symbol: string // Символ
}

export const Currencies: Record<string, Currency> = {
    RUB: { code: 643, symbol: '₽' },
    USD: { code: 840, symbol: '$' },
    EUR: { code: 978, symbol: '€' },
    UAH: { code: 980, symbol: '₴' },
    KZT: { code: 398, symbol: '₸' },
    BTC: { code: -1, symbol: '₿' },
    LTC: { code: -1, symbol: 'L' },
    USDT_TRC20: { code: -1, symbol: 'USDT-TRC20' },
    USDT_ERC20: { code: -1, symbol: 'USDT-ERC20' },
    TRX: { code: -1, symbol: 'TRX' },
    TON: { code: -1, symbol: 'TON' },
    DASH: { code: -1, symbol: 'DASH' },
    ETH: { code: -1, symbol: 'ETH' },
    ZCASH: { code: -1, symbol: 'ZCASH' },
    BTC_CASH: { code: -1, symbol: 'BTC_CASH' }
} as const