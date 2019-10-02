'use strict';

/* eslint-disable no-unused-vars */

process.env.SECRET = 'secretsecret';

const jwt = require('jsonwebtoken');
const Roles = require('../src/model/roles');
const server = require('../src/app.js').server;
const supergoose = require('cf-supergoose');

const mockRequest = supergoose.server(server);

const users = {
  admin: { username: 'admin', password: 'password', role: 'admin'},
  editor: { username: 'editor', password: 'password', role: 'editor'},
  user: { username: 'user', password: 'password', role: 'user'},
};

const roles = {
  admin: { role: 'admin', capabilities: ['create', 'read', 'update', 'delete'] },
  editor: { role: 'editor', capabilities: ['create', 'read', 'update'] },
  user: { role: 'user', capabilities: ['read'] },
};


beforeAll(async (done) => {
  await supergoose.startDB();
  const admin = await new Roles(roles.admin).save();
  const editor = await new Roles(roles.editor).save();
  const user = await new Roles(roles.user).save();
  done();
});

let encodedToken;
let id;

afterAll(supergoose.stopDB);

describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            let token = jwt.verify(results.headers.token, process.env.SECRET);
            id = token.id;
            encodedToken = results.headers.token;
            expect(token.id).toBeDefined();
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            let token = jwt.verify(results.headers.token, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with bearer', () => {
        return mockRequest.post('/signin')
          .set('Authorization', `Bearer ${encodedToken}`)
          .then(results => {
            let token = jwt.verify(results.headers.token, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });
    });
  });
});

describe('Errors', () => {
  it('returns 404 page does not exist', () => {
    return mockRequest.get('/random')
      .then(results => {
        expect(results.status).toEqual(404);
      });
  });

  it('returns 500 when server error', () => {
    return mockRequest.post('/signin')
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });

});
