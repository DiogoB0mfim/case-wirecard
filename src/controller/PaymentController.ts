import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentDTO } from "../models/Payment";

const paymentBusiness = new PaymentBusiness();

export class PaymentController {
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

      const result = await paymentBusiness.createPayment(newPayment, token);

      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async getPayments(req: Request, res: Response) {
    try {
      const result = await paymentBusiness.getPayments();
      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
