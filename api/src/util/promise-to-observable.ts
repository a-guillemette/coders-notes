import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export function toObservable<T>(this: Promise<T>): Observable<T> {
    return Observable.fromPromise(this);
}

Promise.prototype.toObservable = toObservable;

declare global {
    interface Promise<T> {
        toObservable(): Observable<T>;
    }
}
