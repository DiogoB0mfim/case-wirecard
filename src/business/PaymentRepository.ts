import { Payment, PaymentDTO } from "../models/Payment";

export interface PaymentRepository {
  createPayment(payment: PaymentDTO): Promise<any>;

  getPayments(): Promise<Payment[]>;
}
