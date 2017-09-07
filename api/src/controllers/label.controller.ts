import { Request, Response, Next } from 'restify';

import { Label, DataObject } from '@codersnotes/core';
import { HttpGet, HttpDelete, HttpPost, HttpPut, Route, RoutePrefix } from '../decorators/route.decorator';

import { IdFilter } from '../filter/id-filter';
import { DatabaseService } from '../services/database.service';

@RoutePrefix('label')
export class LabelController {
    @HttpGet @Route('')
    getLabels(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).find<Label>().toArray()
            .then(labels => {
                res.send(200, labels);
                next();
            })
            .catch(error => {
                res.send(500, error);
                next();
            });
    }

    @HttpGet @Route('/:id')
    getLabel(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).findOne<Label>(new IdFilter(req.params.id))
            .then(label => {
                res.send(200, label);
                next();
            })
            .catch(error => {
                res.send(500, error);
                next();
            });
    }

    @HttpPost @Route('')
    createLabel(req: Request, res: Response, next: Next) {
        const labelFilter = new Label();
        labelFilter.text = req.body.text;
        DatabaseService.db.collection(Label.name).findOne<Label>(labelFilter)
            .then(label => {
                if (label) {
                    res.send(400);
                    // TODO Unhandle promise rejection. Error: Can't set headers after they are sent.
                    return null;
                } else {
                    return DatabaseService.db.collection(Label.name).insertOne(labelFilter);
                }
            })
            .then(result => {
                res.send(200, result);
                next();
            })
            .catch(error => {
                res.send(500, error);
                next();
            });
    }

    @HttpPut @Route('/:id')
    updateLabel(req: Request, res: Response, next: Next) {
        const idFilter = new IdFilter(req.params.id);
        DatabaseService.db.collection(Label.name).findOne<Label>(idFilter)
            .then(label => {
                if (label) {
                    label.text = DataObject.from(Label, req.body).text;
                    return DatabaseService.db.collection(Label.name).updateOne(idFilter, label);
                } else {
                    res.send(404);
                    // TODO Unhandle promise rejection. Error: Can't set headers after they are sent. (MAYBE)
                    return null;
                }
            })
            .then(result => {
                if (result.matchedCount > 0) {
                    res.send(200, result);
                } else if (result.matchedCount <= 0) {
                    res.send(404, result);
                } else {
                    res.send(500);
                }
                next();
            })
            .catch(error => {
                res.send(500, error);
                next();
            });
    }

    @HttpDelete @Route('/:id')
    removeLabel(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(Label.name).deleteOne(new IdFilter(req.params.id))
            .then(result => {
                res.send(200, result);
                next();
            })
            .catch(error => {
                res.send(500, error);
                next();
            });
    }
}
