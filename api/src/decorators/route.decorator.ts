import { HttpMethod } from '../http-method.enum';

export interface RouteParams {
    method?: HttpMethod,
    route?: string,
    propertyKey: string | symbol;
}

export function Route(route: string) {
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
    }
}

export function HttpGet(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.get, target, propertyKey);
}

export function HttpPost(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.get, target, propertyKey);
}

export function HttpPut(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.get, target, propertyKey);
}

export function HttpDelete(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    setMethod(HttpMethod.get, target, propertyKey);
}

export function getControllerRoutes(target: Object): Array<RouteParams> {
    const propertyKeys: Array<string | symbol> = Reflect.getMetadata('routes', target);
    const routes: Array<RouteParams> = [];
    const nbKeys = propertyKeys ? propertyKeys.length : 0;

    for (let i = 0; i < nbKeys; i++) {
        const routeParams: RouteParams = Reflect.getMetadata('route', target, propertyKeys[i]);
        if (routeParams && routeParams.route !== undefined) {
            routes.push(routeParams);
        }
    }

    return routes;
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