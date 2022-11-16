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

exports.insertUser = async (body) => {
  const searchUser = await this.searchUser(body.email);
  // console.log('searching user returned ' + searchUser);
  if (!searchUser) {
    const saltRounds = 10;
    body.password = bcrypt.hashSync(body.password, saltRounds);
    const insert = `INSERT INTO users(usr) VALUES ($1);`;
    const query = {
      text: insert,
      values: [body],
    };
    // console.log(query);
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
}

exports.selectFoodItems = async (body) => {
  const query = {
    text: 'SELECT * FROM food',
    values: []
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

exports.updateFood = async (id, body) => {
  // Change here (columns):
  const columns = ['item', 'amount', 'purchaseDate', 'notes', 'tags'];
  const sets = columns.map((column, index) => column + ` = $` + (index+1));
  console.log(sets.toString());

  const update = `UPDATE food SET ` + sets.toString() + ` WHERE id =` + id;
  const query = {
    text: update,
    values: columns.map((column) => body[column]),
  }

  const {rows} = await pool.query(query);
  return rows;
}

exports.deleteFood = async (id) => {
  console.log(id);
  const update = `DELETE FROM food WHERE id = $1`;
  const query = {
    text: update,
    values: [id],
  }
  await pool.query(query);
}