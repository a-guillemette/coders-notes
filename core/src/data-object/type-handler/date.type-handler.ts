import { TypeHandler } from '../type-handler';

export class DateTypeHandler implements TypeHandler<Date> {
    clone(date: Date): Date {
        return new Date(+date);
    }

    set(date: Date, dto: Object | any) {
        if (dto instanceof Date || !isNaN(+dto)) {
            date.setTime(+dto);
        } else if (typeof dto === 'string' || dto instanceof String) {
            date.setTime(+(new Date(dto as string)));
        } else {
            throw new Error('DateTypeHandler: Cannot be assigned to Date: ' + JSON.stringify(dto));
        }
    }

    equals(date1: Date, date2: Date): boolean {
        return +date1 === +date2;
    }
}
