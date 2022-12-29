import express from "express";
import { PaymentController } from "../controller/PaymentController";

export const paymentRouter = express.Router();
const paymentController = new PaymentController();

// Path para criar uma transação
paymentRouter.post("/create-transaction", paymentController.createPayment);

// Path para pegar as transações
paymentRouter.get("/get-payments", paymentController.getPayments);