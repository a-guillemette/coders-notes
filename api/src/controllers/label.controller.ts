import {HttpDelete, HttpPost, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {HttpGet} from '../decorators/route.decorator';


@RoutePrefix('label')
export class LabelController {
    @HttpPost @Route('')
    getLabels(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpGet @Route(':id')
    getLanguage(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpPost @Route(':id')
    editLanguage(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpDelete @Route(':id')
    removeLabel(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
