import { Payment, PaymentMethod, PaymentStatus } from "../../../src/models/Payment";

export const PaymentMock: Payment[] = [
  {
    paymentId: "111",
    clientId: "222",
    method: PaymentMethod.BOLETO,
    amount: 200,
    cardHolderName: "",
    cardNumber: "",
    cardExpDate: "",
    cardCvv: "",
    status: PaymentStatus.ESPERA,
  },

  {
    paymentId: "222",
    clientId: "333",
    method: PaymentMethod.CARD,
    amount: 200,
    cardHolderName: "DIOGO O S BOMF",
    cardNumber: "1234 5678 8975 1267",
    cardExpDate: "2025/12/11",
    cardCvv: "177",
    status: PaymentStatus.APROVADO,
  }
];
