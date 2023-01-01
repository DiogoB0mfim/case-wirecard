import express from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentController } from "../controller/PaymentController";
import { PaymentDatabase } from "../data/PaymentDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const paymentRouter = express.Router();

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()

const paymentDatabase = new PaymentDatabase();
const paymentBusiness = new PaymentBusiness(paymentDatabase, idGenerator, tokenGenerator);
const paymentController = new PaymentController(paymentBusiness);

// Path para criar uma transação
paymentRouter.post("/create-transaction", (req, res) => paymentController.createPayment (req, res));

// Path para pegar as transações
paymentRouter.get("/get-payments", (req, res) =>  paymentController.getPayments (req, res));