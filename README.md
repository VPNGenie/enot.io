## Установка
```
npm i @vpngenie/enot
```
## Иницализация клиента
```javascript
import { EnotClient } from "enot";

const client = new EnotClient({
    apiKey: 'your_api_key',
    shopId: 'your_shop_id',
    secretKey: 'your_secret_key'
});
```
## Пример использование:
### Создание платежа
```javascript
const invoice = await client.getPayments().create({ amount: 100, order_id: 'ORD-123' });

console.log(invoice)
// {
//  "amount": 10,
//  "order_id": "1",
//  "email": "test.test@example.com",
//  "currency": "RUB",
//  "custom_fields": "{\"order\": \"74056\"}",
//  "comment": "string",
//  "fail_url": "https://enot.io/fail",
//  "success_url": "https://enot.io/success",
//  "hook_url": "https://enot.io/hook",
//  "shop_id": "33908637-00e0-4f0d-a27d-d1d87d2f5033",
//  "expire": 300,
//  "include_service": [
//   "card"
//  ],
//  "exclude_service": [
//   "qiwi"
//  ]
// }
```
### Получение информации о платеже
```javascript
const info = await client.getPayments().getInfo({ invoice_id: 'uuid' })

console.log(info);
// {
//  "data": {
//   "invoice_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "order_id": "123",
//   "shop_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "status": "created",
//   "invoice_amount": 0,
//   "credited": 0,
//   "currency": "RUB",
//   "pay_service": "card",
//   "commission_amount": 0,
//   "commission_percent": 0,
//   "shop_commission_amount": 0,
//   "shop_commission_percent": 0,
//   "user_commission_amount": 0,
//   "user_commission": 0,
//   "custom_field": [
//    "paymentId": "123"
//   ]
//   "created_at": "2017-07-21 10:00",
//   "expired_at": "2017-07-21 10:00",
//   "paid_at": "2017-07-21 10:00"
//  }
//  "status": 200,
//  "status_check": true
// }
```
### Получение доступных методов оплаты
```javascript
const tariffs = await client.getPayments().getPaymentTariffs();

console.log(tariffs);
// {
//  "data": {
//   "tariffs": [
//    {
//     "percent": 0,
//     "max_sum": 0,
//     "shop_percent": 0,
//     "user_percent": 0,
//     "service": "card",
//     "service_label": "Банковская карта",
//     "currency": "RUB",
//     "status": "string"
//    }
//   ]
//  },
//  "status": 200,
//  "status_check": true
// }
```
### Обработка webhook
```javascript
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post('/webhook/enot', (req: Request, res: Response) => {
    const isValid = client.verifySignature(req);

    if (!isValid) {
        return res.status(401).send('Invalid Signature');
    }

    return res.status(200).json(req.body);
})
```
### Получение баланса
```javascript
console.log(
    client.getPayout().getBalance('userId')
)
// {
//  "data": {
//   "balance": 0,
//   "active_balance": 0,
//   "freeze_balance": 0
//  },
//  "status": 200,
//  "status_check": true
// }

```
### Получение информации о выводе
```javascript
const info = await client.getPyout().getInfo({ id: 'id' })

console.log(info);
// {
//  "data": {
//   "payoff_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "status": "success",
//   "service": "card",
//   "wallet": "4000000000000000",
//   "type": "payoff",
//   "subtract": "balance",
//   "amount": 10,
//   "amount_withdraw_rub": 11,
//   "commission_rub": 1,
//   "receive_currency": "RUB",
//   "amount_receive": 10,
//   "comment": "Test payoff",
//   "created_at": "2023-03-21 12:00",
//   "order_id": "1",
//   "paid_at": "2023-03-21 14:00"
//  },
//  "status": 200,
//  "status_check": true
// }
```
### Получение списка доступных банков для вывода через СБП
```javascript
const list = client.getPayout().getSBPBankList('userId');

console.log(list)
// {
//  "data": {
//   "payoff_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "status": "success",
//   "service": "card",
//   "wallet": "4000000000000000",
//   "type": "payoff",
//   "subtract": "balance",
//   "amount": 10,
//   "amount_withdraw_rub": 11,
//   "commission_rub": 1,
//   "receive_currency": "RUB",
//   "amount_receive": 10,
//   "comment": "Test payoff",
//   "created_at": "2023-03-21 12:00",
//   "order_id": "1",
//   "paid_at": "2023-03-21 14:00"
//  },
//  "status": 200,
//  "status_check": true
// }
```