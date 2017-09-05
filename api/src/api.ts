// *** Import Reflect Metadata only once ***
import 'reflect-metadata';

import { createServer, Server, ServerOptions, bodyParser } from 'restify';
import * as _ from 'lodash';

import { HttpMethod } from './http-method.enum';
import { RouteParams, getControllerRoutes } from './decorators/route.decorator';
import { Controllers } from './controllers';

import { DatabaseService } from './services/database.service';
import { Config } from './services/config';

console.log('Reading config file...');
if (Config.instance.load()) {
    console.log('Successfully read config file.');
    initDatabase();
} else {
    console.error('Failed to read config file.');
}

function initDatabase() {
    console.log('Connecting to database...');
    DatabaseService.instance.connect(() => {
        console.log('Connected to database.');
        initServer();
    }, error => {
        console.error('Failed to connect to database. Check connection string and internet connection.');
    });
}

function initServer() {
    const port: number = Config.current.port;
    const serverOptions: ServerOptions = {
        name: 'Coder\'s Notes API'
    };

    const server: Server = createServer(serverOptions);

    server.use(bodyParser());

    if (Config.current.debug) {
        server.use(function (req, res, next) {
            console.log('%s %s', _.padStart(req.method, 6), req.url);
            next();
        });
    }

    registerRoute(server);

    server.listen(port, () => {
        console.log('\r\n%s listening at %s\r\n', server.name, server.url);
    });
}

function registerRoute(server: Server) {
    // Register controller routes
    const nbControllers = Controllers.length;

    console.log('\r\nRegistering routes for %s controllers...', nbControllers);

    for (let i = 0; i < nbControllers; i++) {
        // Instantiate controller
        const controller = new Controllers[i]();

        // Get routes
        const routes = getControllerRoutes(controller);
        const nbRoutes = routes.length;
        if (Config.current.logRoutes) {
            console.log('  %s (%s routes)', controller.constructor.name, nbRoutes);
        }

        // Register routes
        for (let j = 0; j < nbRoutes; j++) {
            const route: RouteParams = routes[j];
            if (Config.current.logRoutes) {
                console.log('    %s %s', _.padStart(route.method.toString(), 6), route.route);
            }
            switch (route.method) {
                case HttpMethod.get:
                    server.get(route.route, controller[route.propertyKey].bind(controller));
                    break;
                case HttpMethod.post:
                    server.post(route.route, controller[route.propertyKey].bind(controller));
                    break;
                case HttpMethod.put:
                    server.put(route.route, controller[route.propertyKey].bind(controller));
                    break;
                case HttpMethod.delete:
                    server.del(route.route, controller[route.propertyKey].bind(controller));
                    break;
            }
        }
    }
}

