import { UserRepository } from "../../../src/business/UserRepository";
import { User, UserDTO } from "../../../src/models/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock implements UserRepository {
  
  public async createUser(user: UserDTO): Promise<any> {}

  public async findUser(email: string): Promise<User | undefined> {
    return email === "email" ? userMock : undefined;
  }
}
