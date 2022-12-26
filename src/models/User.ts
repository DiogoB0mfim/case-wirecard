export type AuthenticationData = {
  id: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
};

export interface UserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export type UserLogin = {
  email: string;
  password: string;
};
