import { type AxiosError, isAxiosError } from "axios";
import { z } from "zod";
import type { NextFunction, Request, Response } from "express";
import {
  isCustomError,
  isAxiosErrResponse,
} from "#src/infrastructure/express/middleware/errors/errors.types.js";
import { logger } from "#src/infrastructure/express/middleware/logger/logger.js";

const handleRouteNotFound = (_: Request, res: Response): void => {
  res.status(404).render("main/error", {
    status: 404,
    message: "Page not found",
  });
};

const handleAxiosErrors = (
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isAxiosError(err) && isAxiosErrResponse(err.response)) {
    const axiosErr = err as AxiosError;
    if (axiosErr.response !== undefined) {
      res.render("main/error", {
        status: axiosErr.response.status,
        message: axiosErr.response.statusText,
      });
    } else {
      next(err);
    }
  }
};

const handleCustomErrors = (
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isCustomError(err)) {
    res.render("main/error", { status: err.status, message: err.msg });
  } else {
    next(err);
  }
};
const handleServerErrors = (
  err: unknown,
  req: Request,
  res: Response,
): void => {
  logger.logError("Server Error Middleware", "Internal Server Error", err, req);
  res.render("main/error", { status: 500, message: "Internal Server Error" });
};

const handleZodErrors = (err: unknown, req: Request, res: Response): void => {
  if (err instanceof z.ZodError) {
    logger.logError(
      "Zod Error Middleware",
      "Invalid response from API",
      err,
      req,
    );
    res.render("main/error", { status: 500, message: "Internal Server Error" });
  }
};

export {
  handleRouteNotFound,
  handleCustomErrors,
  handleAxiosErrors,
  handleServerErrors,
  handleZodErrors,
};
