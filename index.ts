import express from 'express';
import bodyParser from 'body-parser';
import { isArray, isObject } from 'util';

import { FunctionContext, FunctionEvent } from './typings';

import handler from './function/handler';


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text({ type: "text/*" }));
app.disable('x-powered-by');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});


var middleware = (req, res) => {
    let cb = (err, functionResult: any) => {
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

    let fnEvent = new FunctionEvent(req);
    let fnContext = new FunctionContext(cb) as any;

    handler(fnEvent, fnContext);
};

app.post('/*', middleware);
app.get('/*', middleware);
app.patch('/*', middleware);
app.put('/*', middleware);
app.delete('/*', middleware);

const port = process.env.http_port || 3000;

app.listen(port, () => {
    console.log(`OpenFaaS Node.js listening on port: ${port}`)
});
