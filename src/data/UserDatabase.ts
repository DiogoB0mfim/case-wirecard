import BaseDatabase from "./BaseDatabase";
import { User } from "../models/User";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDatabase implements UserRepository{
  public static table = "Wirecard_clients";

  public async createUser(user: User) {
    await BaseDatabase.connection(UserDatabase.table).insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      cpf: user.cpf,
    });
  }

  public async findUser(email: string) {
    const result = await BaseDatabase.connection(UserDatabase.table)
      .select()
      .where({ email });

    return result[0];
  }
}
