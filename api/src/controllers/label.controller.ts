import { Request, Response, Next } from 'restify';

import { Label, DataObject } from '@codersnotes/core';
import { HttpGet, HttpDelete, HttpPost, HttpPut, Route, RoutePrefix } from '../decorators/route.decorator';

import { IdFilter } from '../filter/id-filter';
import { DatabaseService } from '../services/database.service';

@RoutePrefix('label')
export class LabelController {
    @HttpGet @Route('')
    getLabels(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).find<Label>().toArray((error, labels) => {
            if (error) {
                res.send(500);
            } else {
                res.send(labels);
            }
            next();
        });
    }

    @HttpGet @Route('/:id')
    getLabel(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).findOne<Label>(new IdFilter(req.params.id), (error, label) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, label);
            }
            next();
        });
    }

    @HttpPost @Route('')
    createLabel(req: Request, res: Response, next: Next) {
        const label = DataObject.from(Label, req.body);
        DatabaseService.db.collection(Label.name).insertOne(label, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, label);
            }
            next();
        });
    }

    @HttpPut @Route('/:id')
    updateLabel(req: Request, res: Response, next: Next) {
        const label = DataObject.from(Label, req.body);
        DatabaseService.db.collection(Label.name).updateOne({ _id: label._id }, label, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, label);
            }
            next();
        });
    }

    @HttpDelete @Route('/:id')
    removeLabel(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).deleteOne({ _id: req.params.id }, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, result);
            }
            next();
        });
    }
}
