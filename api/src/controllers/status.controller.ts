import {HttpGet, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {DatabaseService} from '../../dist/services/database.service';

@RoutePrefix('status')
export class StatusController {
    @HttpGet @Route('')
    getStatuses(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('status').find().toArray(function (err, documents) {
            console.log(documents);
            res.send(200, documents);
        });
        next();
    }
}
