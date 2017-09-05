import { HttpMethod } from '../http-method.enum';
import * as _ from 'lodash';

export interface RouteParams {
    method?: HttpMethod;
    route?: string;
    propertyKey: string | symbol;
}

export function RoutePrefix(routePrefix: string) {
    return function (target: Object) {
        Reflect.defineMetadata('routePrefix', '/' + _.trim(routePrefix, '/ '), (target as any).prototype);
    };
}

export function Route(route: string) {
    route = _.trim(route, '/ ');
    if (_.startsWith(route, '~/') === false) {
        route = '/' + route;
    }

    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        let routeParam: RouteParams = Reflect.getMetadata('route', target, propertyKey);
        if (!routeParam) {
            routeParam = {
                method: HttpMethod.get,
                propertyKey: propertyKey
            };
        }

        routeParam.route = route;
        Reflect.defineMetadata('route', routeParam, target, propertyKey);
        addRouteToType(target, propertyKey);
    };
}

export function HttpGet(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.get, target, propertyKey);
}

export function HttpPost(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.post, target, propertyKey);
}

export function HttpPut(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.put, target, propertyKey);
}

export function HttpDelete(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.delete, target, propertyKey);
}

export function getControllerRoutes(target: Object): Array<RouteParams> {
    const routePrefix: string = Reflect.getMetadata('routePrefix', target);
    const propertyKeys: Array<string | symbol> = Reflect.getMetadata('routes', target);
    const routes: Array<RouteParams> = [];
    const nbKeys = propertyKeys ? propertyKeys.length : 0;

    for (let i = 0; i < nbKeys; i++) {
        const routeParams: RouteParams = Reflect.getMetadata('route', target, propertyKeys[i]);
        if (routeParams && routeParams.route !== undefined) {
            routes.push(routeParams);
        }
    }

    if (routePrefix && routePrefix.length > 0) {
        routes.forEach(routeParams => {
            if (_.startsWith(routeParams.route, '~/') === false) {
                if (routeParams.route !== '/') {
                    routeParams.route = routePrefix + routeParams.route;
                } else {
                    routeParams.route = routePrefix;
                }
            } else {
                routeParams.route = routeParams.route.substring(1);
            }
        });
    }

    return routes.sort((a, b) => a.route.localeCompare(b.route));
}

function setMethod(method: HttpMethod, target: Object, propertyKey: string | symbol) {
    let routeParam: RouteParams = Reflect.getMetadata('route', target, propertyKey);
    if (!routeParam) {
        routeParam = {
            propertyKey: propertyKey
        };
    }

    routeParam.method = method;
    Reflect.defineMetadata('route', routeParam, target, propertyKey);
}

function addRouteToType(target: Object, propertyKey: string | symbol) {
    // Get routes collection
    let routes: Array<string | symbol> = Reflect.getMetadata('routes', target);

    // If routes metadata is not already present, create new array
    if (!routes) {
        routes = [];
    }

    if ((routes.indexOf(propertyKey) >= 0) === false) {
        // Add the route to the collection
        routes.push(propertyKey);
    }
    Reflect.defineMetadata('routes', routes, target);
}
