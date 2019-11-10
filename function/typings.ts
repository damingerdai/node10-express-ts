import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export class FunctionEvent {

    private req: Request;

    public get body(): any {
        return this.req.body;
    }

    public get headers(): IncomingHttpHeaders {
        return this.req.headers;
    }

    public get method(): string {
        return this.req.method;
    }

    public get query(): any {
        return this.req.query;
    }

    public get path(): string {
        return this.req.path;
    }

    constructor(req: Request) {
        this.req = req;
    }
}

export class FunctionContext {
    value: number;
    cb: any;
    headerValues: {};
    constructor(cb) {
        this.value = 200;
        this.cb = cb;
        this.headerValues = {};
    }

    status(value) {
        if (!value) {
            return this.value;
        }

        this.value = value;
        return this;
    }

    headers(value) {
        if (!value) {
            return this.headerValues;
        }

        this.headerValues = value;
        return this;
    }

    succeed(value) {
        let err;
        this.cb(err, value);
    }

    fail(value) {
        let message;
        this.cb(value, message);
    }
}
