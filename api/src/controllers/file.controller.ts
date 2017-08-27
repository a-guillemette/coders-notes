import {HttpPost, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {HttpDelete, HttpGet} from '../decorators/route.decorator';


@RoutePrefix('file')
export class FileController {
    @HttpGet @Route(':id')
    getFile(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpPost @Route(':id')
    editFile(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpDelete @Route(':id')
    removeFile(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
