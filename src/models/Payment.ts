export enum PaymentMethod {
  BOLETO = "BOLETO",
  CARD = "CARD",
}

export type Payment = {
  paymentId: string;
  clientId: string;
  method: PaymentMethod;
  amount: number;
  cardHolderName: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
};

export interface PaymentDTO {
  clientId: string;
  method: PaymentMethod;
  amount: number;
  cardHolderName: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
}
