import { User, UserDTO, UserLogin } from "../models/User";
import {
  CustomError,
  IncorrectPassword,
  InvalidCpf,
  InvalidEmail,
  InvalidInfos,
  InvalidPassword,
  InvalidUser,
} from "../error/CustomError";
import { UserRepository } from "./UserRepository";
import { IHashManager, IIdGenerator, ITokenGenerator } from "./Port";

export class UserBusiness {
  constructor(
    private userDatabase: UserRepository,
    private hashManager: IHashManager,
    private idGenerator:IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ){};
  
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

      const id = this.idGenerator.generate();
      const hashPassword = await this.hashManager.hash(password);

      const newUser: User = {
        id: id,
        name: name,
        email: email,
        password: hashPassword,
        cpf: cpf,
      };

      await this.userDatabase.createUser(newUser);
      const token = this.tokenGenerator.generateToken({ id });

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

      const user = await this.userDatabase.findUser(email);

      if (user === undefined) {
        throw new InvalidUser();
      }

      const isValidPass = await this.hashManager.compare(password, user.password);

      if (!isValidPass) {
        throw new IncorrectPassword();
      }

      const token = this.tokenGenerator.generateToken({ id: user.id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
