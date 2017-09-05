import 'mocha';
import { expect } from 'chai';
import * as supertest from 'supertest';

import { server } from '../src/api';

describe('api', () => {
    it('should return Hello world', (done) => {
        supertest(server)
            .get('/hello/world')
            .expect(200)
            .then(res => {
                const body = res.body;
                expect(body).to.be.a('string');
                expect(body).to.be.equal('Hello world');
                done();
            }).catch(reason => {
                done(reason);
            });
    });
});
