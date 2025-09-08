export interface WithdrawalMethod {
    oldCode: string, // Старый код
    code: string, // Полный код
    name: string // Наименование
}

export const WithdrawalMethods: Record<string, WithdrawalMethod> = {
    CARD: { oldCode: 'cd', code: 'card', name: 'Банковская карта' },
    QIWI: { oldCode: 'qw', code: 'qiwi', name: 'QIWI' },
    BTC: { oldCode: 'bt', code: 'bitcoin', name: 'Bitcoin' },
    ETH: { oldCode: 'et', code: 'ethereum', name: 'Ethereum' },
    DASH: { oldCode: 'ds', code: 'dash', name: 'DASH' },
    LTC: { oldCode: 'lc', code: 'litecoin', name: 'Litecoin' },
    USDT_TRC20: { oldCode: 'trc20', code: 'usdt_trc20', name: 'USDT TRC20' },
    USDT_ERC20: { oldCode: 'erc20', code: 'usdt_erc20', name: 'USDT ERC20' },
    TRX: { oldCode: 'trx', code: 'trx', name: 'TRX' },
    TON: { oldCode: 'ton', code: 'ton', name: 'TON' },
    PERFECT_MONEY: { oldCode: 'pm', code: 'perfect_money', name: 'Perfect Money' },
    YOOMONEY: { oldCode: 'ya', code: 'yoomoney', name: 'ЮMoney' },
    PAYEER: { oldCode: 'pa', code: 'payeer', name: 'Payeer' },
    MOBILE: { oldCode: 'mb', code: 'mobile', name: 'Мобильная связь' },
    ADVCASH: { oldCode: 'ad', code: 'advcash', name: 'Advcash' },
    WEBMONEY: { oldCode: 'wm', code: 'Webmoney', name: 'WebMoney' },
    GARANTEX: { oldCode: 'cg', code: 'garantex', name: 'Garantex' },
} as const