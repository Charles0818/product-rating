import { Response } from 'express'
export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}


class BaseError extends Error {
  public readonly name: string;
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(name: string, statusCode: HttpStatusCode, message: string, isOperational: boolean) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class ServerError extends BaseError {
  constructor(name = 'Server Error', statusCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, message = 'internal server error') {
    super(name, statusCode, message, isOperational);
  }
}

export class HTTP400Error extends BaseError {
  constructor(message = 'Bad request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, message, true);
  }
}

export class HTTP404Error extends BaseError {
  constructor(message = 'Not Found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, message, true);
  }
}

export const handleError = (err: BaseError, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
