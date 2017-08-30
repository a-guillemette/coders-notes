import {HttpDelete, HttpGet, HttpPost, HttpPut, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';


@RoutePrefix('language')
export class LanguageController {
    @HttpGet @Route('')
    getLanguages(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpGet @Route(':id')
    getLanguage(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpPut @Route('')
    addLanguage(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }

    @HttpDelete @Route(':id')
    removeLanguage(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
