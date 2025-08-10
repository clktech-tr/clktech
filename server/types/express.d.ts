declare module 'express' {
  import { EventEmitter } from 'events';
  import { IncomingMessage, ServerResponse } from 'http';

  export interface Request extends IncomingMessage {
    body: any;
    params: any;
    query: any;
  }

  export interface Response extends ServerResponse {
    json(body: any): Response;
    send(body: any): Response;
    status(code: number): Response;
    sendFile(path: string): void;
  }

  export interface NextFunction {
    (err?: any): void;
  }

  export interface Express extends EventEmitter {
    (): Application;
    static: (root: string) => any;
    json: () => any;
    urlencoded: (options: { extended: boolean }) => any;
  }

  export interface Application {
    use(path: string | RequestHandler, ...handlers: RequestHandler[]): Application;
    get(path: string, ...handlers: RequestHandler[]): Application;
    post(path: string, ...handlers: RequestHandler[]): Application;
    put(path: string, ...handlers: RequestHandler[]): Application;
    delete(path: string, ...handlers: RequestHandler[]): Application;
  }

  export interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): void;
  }

  const express: Express;
  export default express;
}
