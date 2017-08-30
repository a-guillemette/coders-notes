import {HttpGet, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {DatabaseService} from '../services/database.service';


@RoutePrefix('visibility')
export class VisibilityController {
    @HttpGet @Route('')
    getVisibilities(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('visibility').find().toArray(function (err, documents) {
            res.send(200, documents);
        });
        next();
    }
}
