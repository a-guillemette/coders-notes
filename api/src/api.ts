// *** Import Reflect Metadata only once ***
import 'reflect-metadata';

import { createServer, Server, ServerOptions } from "restify";
import * as _ from 'lodash';

import { HttpMethod } from './http-method.enum';
import { RouteParams, getControllerRoutes } from './decorators/route.decorator';
import { Controllers } from './controllers';

const port: number = 8426;
const debug: boolean = true;
const serverOptions: ServerOptions = {
    name: 'Coder\'s Notes API'
};

export const server: Server = createServer(serverOptions);

if (debug) {
    server.use(function(req, res, next) {
        console.log('%s %s', _.padStart(req.method, 6), req.url);
        next();
    });
}

// Register controller routes
const nbControllers = Controllers.length;

console.log('\r\nRegistering routes for %s controllers...', nbControllers);

for (let i = 0; i < nbControllers; i++) {
    // Instantiate controller
    const controller = new Controllers[i]();

    // Get routes
    const routes = getControllerRoutes(controller);
    const nbRoutes = routes.length;
    console.log('  %s (%s routes)', Controllers[i].name, nbRoutes);

    // Register routes
    for (let j = 0; j < nbRoutes; j++) {
        const route: RouteParams = routes[j];
        console.log('    %s', route.route);
        server.get(route.route, controller[route.propertyKey]);
    }
}

server.listen(port, () => {
    console.log('\r\n%s listening at %s\r\n', server.name, server.url);
});
