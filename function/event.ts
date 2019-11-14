import { IncomingHttpHeaders } from 'http';

export class FunctionEvent {

    private req: any;

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

    constructor(req: any) {
        this.req = req;
    }
}

