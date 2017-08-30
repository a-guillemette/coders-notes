import {HttpGet, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {DatabaseService} from '../services/database.service';


@RoutePrefix('theme')
export class ThemeController {
    @HttpGet @Route('')
    getThemes(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('theme').find().toArray(function (err, documents) {
            res.send(200, documents);
            next();
        });
    }
}
