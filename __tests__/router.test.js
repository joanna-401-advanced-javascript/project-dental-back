'use strict';

const server = require('../src/app').server;

const supergoose = require('cf-supergoose');
const mockRequest = supergoose.server(server);

describe('Initial test', () => {
  test('', () => {
    return mockRequest.get('/test')
      .then(results => {
        expect(results.text).toEqual('SUCCESS: HIT TEST ROUTE');
      });
  });
});