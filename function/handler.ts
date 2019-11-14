import { FunctionEvent } from './event';
import { FunctionContext } from './context';

export = (event: FunctionEvent, context: FunctionContext) => {
    let err;
    const result =             {
        status: "You said: " + JSON.stringify(event.body)
    };

    context
        .status(200)
        .succeed(result);
}
