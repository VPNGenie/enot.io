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
```
### Получение информации о платеже
```javascript
const info = await client.getPayments().getInfo({ invoice_id: 'uuid' })

console.log(info);
```
### Получение доступных методов оплаты
```javascript
const tariffs = await client.getPayments().getPaymentTariffs();

console.log(tariffs);
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