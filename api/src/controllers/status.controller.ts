import {HttpGet, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {StatusEnum} from '@codersnotes/core';


@RoutePrefix('status')
export class StatusController {
    @HttpGet @Route('')
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
