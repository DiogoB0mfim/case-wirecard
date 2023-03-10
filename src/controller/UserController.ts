import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO, UserLogin } from "../models/User";

export class UserController {
  constructor(
    private userBusiness : UserBusiness
  ){};

  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, cpf } = req.body;

      const newUser: UserDTO = {
        name,
        email,
        password,
        cpf,
      };

      const token = await this.userBusiness.createUser(newUser);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userLogin: UserLogin = {
        email,
        password,
      };

      const token = await this.userBusiness.login(userLogin);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
