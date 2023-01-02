import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";

const idGenerator = new IdGeneratorMock();

const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new HashManagerMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste de criar usuário", () => {
    test("Teste 1 : testando se o nome é valido", async () => {
      expect.assertions(2);
      try {
        const mock = {
            name: "Diogo",
            email: "diogo@gmail.com",
            password: "123456",
            cpf: "111"
          };
        await userBusiness.createUser(mock);
      } catch (error: any) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe("CPF inválido!");
      }
    });

    test("Teste 2 : testando se o e-mail é valido", async () => {
      expect.assertions(2);
      try {
        const mock = {
            name: "Diogo",
            email: "diogogmail.com",
            password: "123456",
            cpf: "11111111111"
          };
        await userBusiness.createUser(mock);
      } catch (error: any) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe("E-mail inválido!");
      }
    });
});


