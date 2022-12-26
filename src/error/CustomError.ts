export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidInfos extends CustomError {
  constructor() {
    super(400, "Um ou mais dados inválidos!");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(400, "E-mail inválido!");
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super(400, "Senha inválida, pois contém menos de 6 digitos!");
  }
}

export class IncorrectPassword extends CustomError {
  constructor() {
    super(400, "Senha inválida!");
  }
}

export class InvalidCpf extends CustomError {
  constructor() {
    super(400, "CPF inválido!");
  }
}

export class InvalidUser extends CustomError {
  constructor() {
    super(400, "Email ou senha incorretos!");
  }
}
