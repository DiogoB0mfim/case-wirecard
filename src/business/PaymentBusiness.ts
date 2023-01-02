import { Payment, PaymentDTO, PaymentMethod, PaymentStatus } from "../models/Payment";
import {
  CustomError,
  InvalidAmount,
  InvalidAuthenticatorData,
  InvalidCard,
  InvalidInfos,
  InvalidMethod,
  InvalidToken,
  NoPaymentsRegistered,
} from "../error/CustomError";
import { IIdGenerator, ITokenGenerator } from "./Port";
import { PaymentRepository } from "./PaymentRepository";

export class PaymentBusiness {
  constructor(
    private paymentDatabase: PaymentRepository,
    private idGenerator:IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ){};

  public async createPayment(payment: PaymentDTO, token: string) {
    try {
      const { clientId, method, amount, cardHolderName, cardNumber, cardExpDate, cardCvv } = payment;

      let operationResponse = null;

      if (!clientId || !method) {
        throw new InvalidInfos();
      }

      if (method !== PaymentMethod.BOLETO && method !== PaymentMethod.CARD) {
        throw new InvalidMethod();
      }

      if (method === PaymentMethod.BOLETO) {
        operationResponse = this.idGenerator.generate();
      }

      if (method === PaymentMethod.CARD && cardHolderName && cardNumber && cardExpDate && cardCvv) {
        operationResponse = "Sucesso!";
      }

      if (method === PaymentMethod.CARD && !cardHolderName || method === PaymentMethod.CARD && !cardNumber || method === PaymentMethod.CARD && !cardExpDate || method === PaymentMethod.CARD && !cardCvv) {
        throw new InvalidCard();
      }

      if (amount <= 0) {
        throw new InvalidAmount();
      }

      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }

      const id = this.idGenerator.generate();

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

      await this.paymentDatabase.createPayment(newPayment);
      return operationResponse;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public async getPayments(token : string) {
    try {

      if (!token) {
        throw new InvalidToken();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthenticatorData();
      }
      
      const result = await this.paymentDatabase.getPayments();

      if (result.length < 1) {
        throw new NoPaymentsRegistered();
      }

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
