import { User, UserDTO, UserLogin } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import {
  CustomError,
  IncorrectPassword,
  InvalidCpf,
  InvalidEmail,
  InvalidInfos,
  InvalidPassword,
  InvalidUser,
} from "../error/CustomError";

const userDatabase = new UserDatabase();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const tokenGenerator = new TokenGenerator();

export class UserBusiness {
  public async createUser(user: UserDTO) {
    try {
      const { name, email, password, cpf } = user;

      if (!name || !email || !password || !cpf) {
        throw new InvalidInfos();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (password.length < 6) {
        throw new InvalidPassword();
      }

      if (cpf.length !== 11) {
        throw new InvalidCpf();
      }

      const id = idGenerator.generate();
      const hashPassword = await hashManager.hash(password);

      const newUser: User = {
        id: id,
        name: name,
        email: email,
        password: hashPassword,
        cpf: cpf,
      };

      await userDatabase.createUser(newUser);
      const token = tokenGenerator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public async login(login: UserLogin) {
    try {
      const { email, password } = login;

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (password.length < 6) {
        throw new InvalidPassword();
      }

      const user = await userDatabase.findUser(email);

      if (user === undefined) {
        throw new InvalidUser();
      }

      const isValidPass = await hashManager.compare(password, user.password);

      if (!isValidPass) {
        throw new IncorrectPassword();
      }

      const token = tokenGenerator.generateToken({ id: user.id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
