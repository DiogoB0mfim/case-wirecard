import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentDTO } from "../models/Payment";

export class PaymentController {
  constructor(
    private paymentBusiness : PaymentBusiness
  ){};

  public async createPayment(req: Request, res: Response) {
    try {
      const { clientId, method, amount, cardHolderName, cardNumber, cardExpDate, cardCvv } = req.body;
      const token = req.headers.authorization as string;

      const newPayment: PaymentDTO = {
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
      };

      const result = await this.paymentBusiness.createPayment(newPayment, token);

      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async getPayments(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await this.paymentBusiness.getPayments(token);
      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
