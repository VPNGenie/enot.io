export enum PaymentStatus {
    CREATED = 'created', // создан/в процессе 
    SUCCESS = 'success', // успех 
    FAIL = 'fail', // транзакции отклонен 
    EXPIRED = 'expired' // истек по времени
}