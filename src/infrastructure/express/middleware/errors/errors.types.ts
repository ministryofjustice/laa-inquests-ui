import type { AxiosResponse } from "axios";

export interface CustomError {
  status: 400;
  msg: string;
}

export const isCustomError = (err: unknown): err is CustomError =>
  typeof err === "object" && err !== null && "status" in err && "msg" in err;

export const isAxiosErrResponse = (res: unknown): res is AxiosResponse =>
  typeof res === "object" &&
  res !== null &&
  "status" in res &&
  "statusText" in res;

export class SigningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SigningError";
    Object.setPrototypeOf(this, SigningError.prototype);
  }
}

export class VerifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VerifyError";
    Object.setPrototypeOf(this, VerifyError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class EmailNotificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailNotificationError";
    Object.setPrototypeOf(this, EmailNotificationError.prototype);
  }
}
