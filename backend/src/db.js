// const e = require('express');
const {Pool} = require('pg');
var bcrypt = require('bcrypt');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// ############################################################################
//    Users

exports.selectUsers = async () => {
  const query = {
    text: 'SELECT * FROM users',
    values: [],
  };
  const {rows} = await pool.query(query);
  const users = [];
  for (const row of rows) {
    users.push(row);
  }
  return users;
};

exports.insertUser = async (body) => {
  const saltRounds = 10;
  body.password = bcrypt.hashSync(body.password, saltRounds);
  const insert = `INSERT INTO users(usr) VALUES ($1) RETURNING *;`;
  const query = {
    text: insert,
    values: [body],
  };
  const {rows} = await pool.query(query);
  const user = rows[0];
  return user;
};

exports.searchUser = async (email) => {
  const select = `SELECT * FROM users where usr->>'email' ILIKE $1`;
  const query = {
    text: select,
    values: [email],
  };

  const {rows} = await pool.query(query);
  return rows.length == 1 ? true : false;
};

exports.getUser = async (body) => {
  const email = body.email;
  const query = {
    text: "SELECT * FROM users WHERE usr->>'email' = $1",
    values: [email],
  }
  const {rows} = await pool.query(query);
  const user = rows[0];
  return user;
};

// ############################################################################
//    Lists

exports.selectLists = async () => {
  const query = {
    text: 'SELECT * FROM lists',
    values: []
  };
  const {rows} = await pool.query(query);
  const lists = [];
  for (const row of rows) {
    lists.push(row);
  }
  return lists;
};

exports.getAllListsOfUser = async (usr_id) => {
  const select = `SELECT list_id 
    FROM users_to_lists
    WHERE usr_id = $1`;
  const query = {
    text: select,
    values: [usr_id],
  }
  const {rows} = await pool.query(query);
  const listIDs = [];
  for (const row of rows) {
    listIDs.push(row.list_id);
  }
  return listIDs;
};

exports.getTheseLists = async (listIDs) => {
  const values = listIDs.map((id, index) => `$` + (index+1));
  const select = `SELECT * FROM lists WHERE id IN (` + values.toString() + `)`;
  const query = {
    text: select,
    values: listIDs,
  }
  const {rows} = await pool.query(query);
  const lists = [];
  for (const row of rows) {
    lists.push(row);
  }
  return lists;
};

exports.findUser = async (usr_id) => {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [usr_id],
  };
  const {rows} = await pool.query(query);
  const user = rows[0];
  return user;
};

exports.findList = async (list_id) => {
  const query = {
    text: 'SELECT * FROM lists WHERE id = $1',
    values: [list_id],
  };
  const {rows} = await pool.query(query);
  const list = rows[0];
  return list;
};

exports.createList = async (body) => {
  const columns = ['list_name'];
  const values = columns.map((column, index) => `$` + (index+1));
  const insert = `INSERT INTO lists(` + columns.toString() + `)
    VALUES (` + values.toString() + `)
    RETURNING *;`;
  const query = {
    text: insert,
    values: columns.map((column) => body[column]),
  };
  const {rows} = await pool.query(query);
  const list = rows[0];
  return list;
};

exports.deleteList = async (id) => {
  const update = `DELETE FROM lists WHERE id = $1`;
  const query = {
    text: update,
    values: [id],
  }
  await pool.query(query);
};

exports.createUserListConc = async (usr_id, list_id) => {
  const insert = `INSERT INTO users_to_lists(usr_id, list_id)
    VALUES ($1, $2)
    RETURNING *;`;
  const query = {
    text: insert,
    values: [usr_id, list_id],
  }
  const {rows} = await pool.query(query);
  const conc = rows[0];
  return conc;
};

exports.getAllUsersOfList = async (list_id) => {
  const select = `SELECT usr_id 
    FROM users_to_lists
    WHERE list_id = $1`;
  const query = {
    text: select,
    values: [list_id],
  }
  const {rows} = await pool.query(query);
  const userIDs = [];
  for (const row of rows) {
    userIDs.push(row.usr_id);
  }
  return userIDs;
};

exports.getTheseUsers = async (userIDs) => {
  const values = userIDs.map((id, index) => `$` + (index+1));
  const select = `SELECT * FROM users WHERE id IN (` + values.toString() + `)`;
  const query = {
    text: select,
    values: userIDs,
  }
  const {rows} = await pool.query(query);
  const users = [];
  for (const row of rows) {
    users.push(row);
  }
  return users;
};

exports.selectUsersToLists = async () => {
  const query = {
    text: 'SELECT * FROM users_to_lists',
    values: []
  };
  const {rows} = await pool.query(query);
  const usersToLists = [];
  for (const row of rows) {
    usersToLists.push(row);
  }
  return usersToLists;
};

// ############################################################################
//    Food

exports.selectFood = async (body) => {
  const query = {
    text: 'SELECT * FROM food',
    values: []
  };
  const {rows} = await pool.query(query);
  return {rows}
};

exports.selectFoodOfList = async (list_id) => {
  const query = {
    text: 'SELECT * FROM food WHERE list_id = $1',
    values: [list_id]
  };
  const {rows} = await pool.query(query);
  const food = [];
  for (const row of rows) {
    delete row.list_id;
    food.push(row);
  }
  return food;
};

exports.insertFood = async (body) => {
  const searchUser = await this.searchUser(body);
  if (!searchUser) {
    // Change here (columns):
    const columns = ['item', 'amount', 'purchaseDate', 'notes', 'tags'];
    const values = columns.map((column, index) => `$` + (index+1));

    const insert = `INSERT INTO food(` + columns.toString() + `) VALUES (` + values.toString() + `);`;
    const query = {
      text: insert,
      values: columns.map((column) => body[column]),
    };
    await pool.query(query);
    return 201;
  } else {
    return 409;
  }
};

exports.insertFoodInList = async (list_id, body) => {
  body.list_id = list_id;
  // Change here (columns):
  const columns = ['list_id', 'item', 'amount', 'purchaseDate', 'notes', 'tags'];
  const values = columns.map((column, index) => `$` + (index+1));
  const insert = `INSERT INTO food(` + columns.toString() + `) 
    VALUES (` + values.toString() + `) 
    RETURNING *;`;
  const query = {
    text: insert,
    values: columns.map((column) => body[column]),
  };
  const {rows} = await pool.query(query);
  const food = rows[0];
  delete food.list_id;
  return food;
};

exports.updateFood = async (id, body) => {
  // Change here (columns):
  const columns = ['item', 'amount', 'purchaseDate', 'notes', 'tags'];
  const sets = columns.map((column, index) => column + ` = $` + (index+1));

  const update = `UPDATE food SET ` + sets.toString() + ` 
    WHERE id =` + id + `
    RETURNING *;`;
  const query = {
    text: update,
    values: columns.map((column) => body[column]),
  }
  const {rows} = await pool.query(query);
  const food = rows[0];
  delete food.list_id;
  return food;
};

exports.deleteFood = async (id) => {
  const update = `DELETE FROM food WHERE id = $1`;
  const query = {
    text: update,
    values: [id],
  }
  await pool.query(query);
};