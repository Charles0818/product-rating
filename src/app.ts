import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import cors from 'cors';
import { requestLoggerMiddleware } from './api/middlewares';
import { handleError } from './api/utils';
const app = express();
app.use(cors());
app.use(requestLoggerMiddleware)
app.use(express.static(path.join('client')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join('client', 'index.html'))
})
app.use(function notFoundHandler(_req: Request, res: Response) {
  res.status(404).send({
    status: 404,
    message: 'Unable to identity the requested resource'
  })
});
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res);
});
export default app;