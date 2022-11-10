const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');
const { authenticate } = require('../auth');

let server;

let token;



beforeAll( async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  const response = await supertest(server).post('/v0/authentication').send(account);
  token = response;
  return db.reset();
});

console.log(token);

afterAll((done) => {
  server.close(done);
});

beforeEach(async () => {
  await request.post('/v0/authenticate')
  .send(account)
  .expect(200)
    .then((res) => {
      console.log(res.body);
      token = res.body.accessToken;
    });
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

const fakeAccount = {
  "email": "hacker@gmail.com",
  "password": "1234"
};

test('Authorization Invalid', async () => {
  await request.post('/v0/authenticate')
    .send(fakeAccount)
    .expect(401)
});

const account = {
  "email": "jsmith0@ucsc.edu",
  "password": "1234"
};

test('Authorization Valid', async () => {
  await request.post('/v0/authenticate')
    .send(account)
    .expect(200)
    .then((res) => {
      token = res.body.accessToken;
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.name).toEqual('John Smith');
    });
});



test('GET /foodlist', async () => {
  await request.get('/v0/foodlist')
    .auth(token, {type: 'bearer'})
    .expect(200)
});

const testFood =  {
  'item': 'cookies',
  'amount': 100,
  'purchaseDate': '2022-12-24',
  'notes': 'cookies for santa'
};

test('POST /foodlist', async () => {
  await request.post('/v0/foodlist')
    .auth(token, {type: 'bearer'})
    .send(testFood)
    .expect(201)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      console.log(res.body);
      expect(res.body.item).toEqual('cookies');
    });
});

const newAccount = {
  'name': 'CJ',
  'email': 'real@gmail.com',
  'password': 'password1234'
}

test('POST /signup (Create new account)', async () => {
  await request.post('/v0/signup')
  .send(newAccount)
  .expect(201)
});

test('GET /signup', async () => {
  await request.get('/v0/signup')
  .expect(200)
  .then((res) => {
    expect(res).toBeDefined();
    expect(res.body.rows).toBeDefined();
    expect(res.body.rows[1].usr.name).toEqual('CJ');
  });
});