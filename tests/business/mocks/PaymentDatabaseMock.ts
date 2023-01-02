import { PaymentRepository } from "../../../src/business/PaymentRepository";
import { Payment, PaymentDTO } from "../../../src/models/Payment";
import { PaymentMock } from "./PaymentMock";

export class PaymentDatabaseMock implements PaymentRepository {
  public async createPayment(payment: PaymentDTO): Promise<any> {}

  public async getPayments(): Promise<Payment[]> {
    return PaymentMock;
  }
}
