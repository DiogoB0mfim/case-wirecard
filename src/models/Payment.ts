export enum PaymentMethod {
  BOLETO = "BOLETO",
  CARD = "CARD",
}

export enum PaymentStatus {
  APROVADO = "APROVADO",
  ESPERA = "ESPERA",
  NEGADO = "NEGADO"
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
  status: PaymentStatus;
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
