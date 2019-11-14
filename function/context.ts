export class FunctionContext {
    value: number;
    cb: any;
    headerValues: {};
    constructor(cb) {
        this.value = 200;
        this.cb = cb;
        this.headerValues = {};
    }

    status(value: number) {
        this.value = value;
        return this;
    }

    headers(value) {
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