import {HttpPost, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {AuthenticationRequest} from '@codersnotes/core';
import {Status, StatusEnum} from '@codersnotes/core';
import {MongoClient} from 'mongodb';


@RoutePrefix('status')
export class StatusController {
	@HttpPost @Route('')
	getStatuses(req: Request, res: Response, next: Next) {
		res.send(200, [
			{
				_id: StatusEnum.normal,
				enumValueName: 'Normal',
				displayName: 'Normal'
			},
			{
				_id: StatusEnum.pinned,
				enumValueName: 'Pinned',
				displayName: 'Pinned'
			},
			{
				_id: StatusEnum.archived,
				enumValueName: 'Archived',
				displayName: 'Archived'
			},
			{
				_id: StatusEnum.deleted,
				enumValueName: 'Deleted',
				displayName: 'Deleted'
			}
		]);
		next();
	}
}