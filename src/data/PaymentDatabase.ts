import { Payment } from "../models/Payment";
import BaseDatabase from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
  public static table = "Wirecard_payments";

  public async createPayment(payment: Payment) {
    await BaseDatabase.connection(PaymentDatabase.table).insert({
      payment_id: payment.paymentId,
      client_id: payment.clientId,
      method: payment.method,
      amount: payment.amount,
      card_holder_name: payment.cardHolderName,
      card_number: payment.cardNumber,
      card_exp_date: payment.cardExpDate,
      card_cvv: payment.cardCvv,
    });
  }

  public async getPayments() {
    const result = await BaseDatabase.connection(
      PaymentDatabase.table
    ).select();

    return result;
  }
}
