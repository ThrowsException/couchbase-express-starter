import { NextFunction } from "connect";
import {
  Response,
  RequestHandler,
  ErrorRequestHandler,
  Request,
} from "express-serve-static-core";

export function wrapError(
  handler: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
): ErrorRequestHandler {
  return function (err: any, req: Request, res: Response, next: NextFunction) {
    return handler(err, req, res, next).catch(next);
  };
}

export function wrap(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler;
export function wrap(
  handler: (
    err: any,
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<void>
): ErrorRequestHandler;
export function wrap(
  handler: (err: any, req: any, res: any, next?: NextFunction) => Promise<void>
): RequestHandler | ErrorRequestHandler {
  if (handler.length <= 3) {
    return function (req: Request, res: Response, next: NextFunction) {
      return handler(req, res, next).catch(next);
    };
  } else {
    return function (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      return handler(err, req, res, next).catch(next);
    };
  }
}
