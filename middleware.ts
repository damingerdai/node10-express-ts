import { Request, Response } from 'express';
import { isArray, isObject } from 'util';
import { FunctionEvent, FunctionContext } from './typings';

import handler = require('./function/handler');

export = (req: Request, res: Response) => {
    const cb = (err, functionResult: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        if (isArray(functionResult) || isObject(functionResult)) {
            res.set(fnContext.headers()).status(fnContext.status()).send(JSON.stringify(functionResult));
        } else {
            res.set(fnContext.headers()).status(fnContext.status()).send(functionResult);
        }
    };

    const fnEvent = new FunctionEvent(req);
    const fnContext = new FunctionContext(cb) as any;

    handler(fnEvent, fnContext);
};