// const e = require('express');
const {Pool} = require('pg');

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
    const insert = `INSERT INTO loginTable(usr) VALUES ($1);`;
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
  const select = `SELECT * FROM loginTable where usr->>'email' ILIKE $1`;
  const query = {
    text: select,
    values: [email],
  };

  // console.log(query);
  const {rows} = await pool.query(query);
  return rows.length == 1 ? true : false;
};

exports.selectUsers = async (body) => {
  const query = {
    text: 'SELECT * FROM loginTable',
    values: [],
  };
  const {rows} = await pool.query(query);
  return {rows};
};
