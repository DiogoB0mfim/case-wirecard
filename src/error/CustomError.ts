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