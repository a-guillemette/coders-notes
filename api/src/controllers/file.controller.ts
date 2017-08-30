import {HttpPost, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {HttpDelete, HttpGet} from '../decorators/route.decorator';
import {DatabaseService} from '../services/database.service';


@RoutePrefix('file')
export class FileController {
    @HttpGet @Route('')
    getFiles(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('file').find().toArray(function (err, documents) {
            res.send(200, documents);
            next();
        });
    }

    @HttpGet @Route(':id')
    getFile(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('file').findOne({_id: req.params.id}, function (err, document) {
            res.send(200, document);
            next();
        });
    }

    @HttpPost @Route('add/:path/:filename/:mediaType/:size')
    addFile(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('file').insertOne({
            path: req.params.path,
            filename: req.params.filename,
            mediaType: req.params.mediaType,
            size: req.params.size
        }, function (err, result) {
            res.send(200, result);
            next();
        });
    }

    @HttpDelete @Route(':id')
    removeFile(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection('file').deleteOne({_id: req.params.id}, function (err, document) {
            res.send(200, document);
            next();
        });
    }
}
