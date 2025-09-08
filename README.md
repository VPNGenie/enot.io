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
await client.getPayments().create({ amount: 100, order_id: 'ORD-123' });
```
### Получение информации о платеже
```javascript
 await client.getPayments().getInfo({ invoice_id: 'uuid' })

```
### Получение доступных методов оплаты
```javascript
await client.getPayments().getPaymentTariffs();
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
client.getPayout().getBalance('userId')
```
### Получение информации о выводе
```javascript
await client.getPyout().getInfo({ id: 'id' })
```
### Получение списка доступных банков для вывода через СБП
```javascript
await lient.getPayout().getSBPBankList('userId');
```
## Создание платежа h2h
```javascript
// Создание инвойса, он же await client.getPayments().create()
const invoice = await client.getH2H().createInvoice({
    amount: 100, 
    order_id: 'ORD-123',
    include_service: ['p2p_card'],
    type: 'direct'
});

if (invoice.data) {
    // Создание H2H платежа
    const payment = await client.getH2H().createH2HPayment({
        invoice_id: invoice.data.id,
        ip: '127.0.0.0',
        user_agent: 'Mizila/5.0',
        payment_data: { bank: 'sber' }
    });

    if (payment.data) {
        console.log('Платеж H2H создан:', payment.data);
    }
}
```