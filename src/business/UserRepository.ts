import { User, UserDTO } from "../models/User";

export interface UserRepository {
  createUser(user: UserDTO): Promise<any>;

  findUser(email: string): Promise<User | undefined>;
}
