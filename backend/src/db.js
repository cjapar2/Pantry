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

exports.insertUser = async (body) => {
  const searchUser = await this.searchUser(body.email);
  if (!searchUser) {
    const saltRounds = 10;
    body.password = bcrypt.hashSync(body.password, saltRounds);
    const insert = `INSERT INTO users(usr) VALUES ($1);`;
    const query = {
      text: insert,
      values: [body],
    };
    await pool.query(query);
    return 201;
  } else {
    return 409;
  }
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

exports.selectUsers = async (body) => {
  const query = {
    text: 'SELECT * FROM users',
    values: [],
  };
  const {rows} = await pool.query(query);
  return {rows};
};

exports.getUser = async (body) => {
  const email = body.email;
  const query = {
    text: "SELECT * FROM users WHERE usr->>'email' = $1",
    values: [email],
  }
  const {rows} = await pool.query(query);
  return rows;
};

// ############################################################################
//    Lists

exports.selectLists = async () => {
  const query = {
    text: 'SELECT * FROM lists',
    values: []
  };
  const {rows} = await pool.query(query);
  return {rows};
};

exports.selectUsersToLists = async () => {
  const query = {
    text: 'SELECT * FROM users_to_lists',
    values: []
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return {rows};
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
  console.log("/???");
  console.log(listIDs);
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
  console.log({rows});
  return rows;
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
  return rows;
};

exports.createUserListConc = async (usr_id, list_id) => {
  const insert = `INSERT INTO users_to_lists(usr_id, list_id)
    VALUES ($1, $2)
    RETURNING id;`;
  const query = {
    text: insert,
    values: [usr_id, list_id],
  }
  const {rows} = await pool.query(query);
  return rows[0].id;
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
  console.log(userIDs);
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
  console.log({rows});
  return {rows};
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
  return {rows}
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
  const searchUser = await this.searchUser(body);
  if (!searchUser) {
    body.list_id = list_id;
    // Change here (columns):
    const columns = ['list_id', 'item', 'amount', 'purchaseDate', 'notes', 'tags'];
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

exports.updateFood = async (id, body) => {
  // Change here (columns):
  const columns = ['item', 'amount', 'purchaseDate', 'notes', 'tags'];
  const sets = columns.map((column, index) => column + ` = $` + (index+1));

  const update = `UPDATE food SET ` + sets.toString() + ` WHERE id =` + id;
  const query = {
    text: update,
    values: columns.map((column) => body[column]),
  }

  const {rows} = await pool.query(query);
  return rows;
};

exports.deleteFood = async (id) => {
  const update = `DELETE FROM food WHERE id = $1`;
  const query = {
    text: update,
    values: [id],
  }
  await pool.query(query);
};