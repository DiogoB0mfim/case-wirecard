import { Payment, PaymentDTO, PaymentMethod, PaymentStatus } from "../models/Payment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { PaymentDatabase } from "../data/PaymentDatabase";
import {
  CustomError,
  InvalidAuthenticatorData,
  InvalidCard,
  InvalidInfos,
  InvalidMethod,
  InvalidToken,
  NoPaymentsRegistered,
} from "../error/CustomError";

const paymentDatabase = new PaymentDatabase();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class PaymentBusiness {
  public async createPayment(payment: PaymentDTO, token: string) {
    try {
      const { clientId, method, amount, cardHolderName, cardNumber, cardExpDate, cardCvv } = payment;

      let operationResponse = null;

      if (!clientId || !method || !amount) {
        throw new InvalidInfos();
      }

      if (method !== PaymentMethod.BOLETO && method !== PaymentMethod.CARD) {
        throw new InvalidMethod();
      }

      if (method === PaymentMethod.BOLETO) {
        operationResponse = idGenerator.generate();
      }

      if (method === PaymentMethod.CARD && cardHolderName && cardNumber && cardExpDate && cardCvv) {
        operationResponse = "Sucesso!";
      }

      if (method === PaymentMethod.CARD && !cardHolderName || method === PaymentMethod.CARD && !cardNumber || method === PaymentMethod.CARD && !cardExpDate || method === PaymentMethod.CARD && !cardCvv) {
        throw new InvalidCard();
      }

      if (!token) {
        throw new InvalidToken();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

      const id = idGenerator.generate();

      const newPayment: Payment = {
        paymentId: id,
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
        status : method === PaymentMethod.CARD ? PaymentStatus.APROVADO : PaymentStatus.ESPERA
      };

      await paymentDatabase.createPayment(newPayment);
      return operationResponse;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public async getPayments() {
    try {
      const result = await paymentDatabase.getPayments();

      if (result.length < 1) {
        throw new NoPaymentsRegistered();
      }

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
