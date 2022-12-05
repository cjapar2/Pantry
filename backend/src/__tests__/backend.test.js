const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');
const { authenticate } = require('../auth');

let server;

let token;



beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});


beforeEach(async () => {
  await request.post('/v0/authenticate')
  .send(account)
  .expect(200)
    .then((res) => {
      token = res.body.accessToken;
    });
});

// beforeEach( async () => {
//   await request.post('/v0/food')
//     .auth(token, {type: 'bearer'})
//     .send(testDeletedFood)
//     .expect(201);
// });

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



test('GET /food', async () => {
  await request.get('/v0/food')
    .auth(token, {type: 'bearer'})
    .expect(200)
});

const testFood =  {
  'item': 'cookies',
  'amount': 100,
  'purchaseDate': '2022-12-24',
  'notes': 'cookies for santa',
  'tags': {}
};

test('POST /food', async () => {
  await request.post('/v0/food')
    .auth(token, {type: 'bearer'})
    .send(testFood)
    .expect(201)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
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
    expect(res.body).toBeDefined();
    expect(res.body[1].usr.name).toEqual('CJ');
  });
});

const newList = {
  "list_name": "new_list"
}

const userId = 1;
test('POST /lists (Post a new list)', async () => {
  await request.post('/v0/lists/' + userId)
  .send(newList)
  .expect(201)
});

test('GET /lists', async () => {
  await request.get('/v0/lists/' + userId)
  .auth(token, {type: 'bearer'})
  .expect(200)
  .then((res) => {
    expect(res).toBeDefined();
    expect(res.body).toBeDefined();
    expect(res.body[0].list_name).toEqual('new_list')
  });
});

const userList = {
  "usr_id": 1,
  "list_id": 1
}

test('POST /users_lists', async() => {
  await request.post('/v0/users_lists/')
    .send(userList)
    .expect(201)
});

test('GET /users_lists', async() => {
  await request.get('/v0/users_lists/')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[1].id).toEqual(2);
    });
});


test('POST /foodInList (Add food item to new list)', async() => {
  await request.post('/v0/foodInList/' + listId)
    .auth(token, {type: 'bearer'})
    .send(testFood)
    .expect(201)
});

test('GET /foodInList', async() => {
  await request.get('/v0/foodInList/' + listId)
    .auth(token, {type: 'bearer'})
    .expect(200)
});

const testFood2 =  {
  'item': 'eggnog',
  'amount': 1,
  'purchaseDate': '2000-12-24',
  'notes': 'eggnog'
};

const testFood2_put =  {
  'item': 'eggnog',
  'amount': 1,
  'purchaseDate': '2000-12-24',
  'notes': 'eggnog spoiled'
};

test('POST /food', async () => {
  await request.post('/v0/food/')
    .auth(token, {type: 'bearer'})
    .send(testFood2)
    .expect(201);
});

const listId = 1;

test('DELETE /food (Delete food item)', async () => {
  await request.delete('/v0/food/' + listId)
    .auth(token, {type: 'bearer'})
    .send(testFood2_put)
    .expect(204);
});