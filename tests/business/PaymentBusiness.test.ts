import { PaymentBusiness } from "../../src/business/PaymentBusiness";
import { CustomError } from "../../src/error/CustomError";
import { PaymentMethod, PaymentStatus } from "../../src/models/Payment";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { PaymentDatabaseMock } from "./mocks/PaymentDatabaseMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";

const idGenerator = new IdGeneratorMock();

const paymentBusiness = new PaymentBusiness(
  new PaymentDatabaseMock(),
  idGenerator,
  new TokenGeneratorMock()
);

const token = "token";

describe("Teste de criar pagamento", () => {
  test("Teste 1 : testando se a quantia do pagamento é maior que 0", async () => {
    expect.assertions(2);
    try {
      const mock = {
        clientId: "222",
        method: PaymentMethod.BOLETO,
        amount: 0,
        cardHolderName: "",
        cardNumber: "",
        cardExpDate: "",
        cardCvv: "",
        status: PaymentStatus.ESPERA,
      };

      await paymentBusiness.createPayment(mock, token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Valor precisa ser maior que zero!");
    }
  });
});

describe("Teste de pegar pagamentos", () => {
  test("Teste 1 : testando erro quando lista de pagamentos esta vazia", async () => {
    expect.assertions(2);
    try {
      await paymentBusiness.getPayments(token);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Sem pagamentos registrados!");
    }
  });
});
