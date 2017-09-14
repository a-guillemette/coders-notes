import {Request, Response, Next} from 'restify';

import {Label, DataObject} from '@codersnotes/core';
import {HttpGet, HttpDelete, HttpPost, HttpPut, Route, RoutePrefix} from '../decorators/route.decorator';

import {IdFilter} from '../filter/id-filter';
import {DatabaseService} from '../services/database.service';
import {Observable} from 'rxjs/Observable';

@RoutePrefix('label')
export class LabelController {
	@HttpGet @Route('')
	getLabels(req: Request, res: Response, next: Next) {
		Observable.fromPromise(DatabaseService.db.collection(Label.name).find<Label>().toArray())
			.subscribe(result => {
				if (result) {
					res.send(200, result);
				} else {
					res.send(500);
				}
				next();
			});
	}

	@HttpGet @Route('/:id')
	getLabel(req: Request, res: Response, next: Next) {
		Observable.fromPromise(DatabaseService.db.collection(Label.name).findOne<Label>(new IdFilter(req.params.id)))
			.subscribe(result => {
				if (result) {
					res.send(200, result);
				} else {
					res.send(500);
				}
				next();
			});
	}

	@HttpPost @Route('')
	createLabel(req: Request, res: Response, next: Next) {
		const labelFilter = new Label();
		labelFilter.text = req.body.text;

		Observable.fromPromise(DatabaseService.db.collection(Label.name).findOne<Label>(labelFilter))
			.flatMap(result => {
				if (result) {
					res.send(400);
					next();
					return null;
				} else {
					return DatabaseService.db.collection(Label.name).insertOne(labelFilter);
				}
			})
			.subscribe(result => {
				if (result) {
					res.send(200, result);
				}
				next();
			}, error => {
				res.send(500);
				next();
			});
	}

	@HttpPut @Route('/:id')
	updateLabel(req: Request, res: Response, next: Next) {
		// TODO Find a way to implement operators that makes sense and is reusable
		let tmp = {
			$set: {
				text: req.body.text
			}
		};

		Observable.fromPromise(DatabaseService.db.collection(Label.name).findOneAndUpdate(new IdFilter(req.params.id), tmp, {
			returnOriginal: false
		}))
			.subscribe(result => {
				if (result.value) {
					res.send(200, result.value);
				} else {
					res.send(404);
				}
				next();
			}, error => {
				res.send(500);
				next();
			});
	}

	@HttpDelete @Route('/:id')
	removeLabel(req: Request, res: Response, next: Next) {
		Observable.fromPromise(DatabaseService.db.collection(Label.name).deleteOne(new IdFilter(req.params.id)))
			.subscribe(result => {
				if (result) {
					res.send(200, result);
				} else {
					res.send(500);
				}
				next();
			});
	}
}
