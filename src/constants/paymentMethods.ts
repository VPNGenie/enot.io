export interface PaymentMethod  {
    oldCode: string, // Старый код
    code: string, // Полный код
    name: string // Наименование
}

export const PaymentMethods: Record<string, PaymentMethod> = {
    CARD: { oldCode: 'cd', code: 'card', name: 'Банковская карта' },
    MIR_CARD: { oldCode: '-', code: 'mir_code', name: 'Карта MIR' },
    QIWI: { oldCode: 'qw', code: 'qiwi', name: 'QIWI' },
    PERFECT_MONEY: { oldCode: 'pm', code: 'perfect_money', name: 'Perfect Money' },
    YOOMONEY: { oldCode: 'ya', code: 'yoomoney', name: 'ЮMoney' },
    SBP: { oldCode: 'sbp', code: 'sbp', name: 'СБП' },
    ZCASH: { oldCode: 'mb', code: 'zcash', name: 'Zcash' },
    ADVCASH: { oldCode: 'ad', code: 'advcash', name: 'Advcash' },
    WEBMONEY: { oldCode: 'wm', code: 'Webmoney', name: 'WebMoney' },
    GOOGLE_PAY: { oldCode: 'cg', code: 'google_pay', name: 'Google Pay' },
    APPLE_PAY: { oldCode: 'ap', code: 'apple_pay', name: 'Apple Pay' },
    BTC: { oldCode: 'bt', code: 'bitcoin', name: 'Bitcoin' },
    ETH: { oldCode: 'et', code: 'ethereum', name: 'Ethereum' },
    DASH: { oldCode: 'ds', code: 'dash', name: 'DASH' },
    LTC: { oldCode: 'lc', code: 'litecoin', name: 'Litecoin' },
    USDT_TRC20: { oldCode: 'trc20', code: 'usdt_trc20', name: 'USDT TRC20' },
    USDT_ERC20: { oldCode: 'erc20', code: 'usdt_erc20', name: 'USDT ERC20' },
    TRX: { oldCode: 'trx', code: 'trx', name: 'TRX' },
    TON: { oldCode: 'ton', code: 'ton', name: 'TON' },
    BTC_CASH: { oldCode: 'bc', code: 'bitcoin_cash', name: 'Bitcoin Cash' },
    P2P_CARD: { oldCode: '-', code: 'p2p_card', name: 'P2P Карты' },
    P2P_SBP: { oldCode: '-', code: 'p2p_sbp', name: 'P2P СБП' }
} as const