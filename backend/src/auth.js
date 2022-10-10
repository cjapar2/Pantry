const {Pool} = require('pg');
// const db = require('./db');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.authenticate = async (req, res) => {
  // need to do something with password, linter error
  // eslint-disable-next-line no-unused-vars
  // console.log('inside authenticate');
  const {user, password} = req.body;
  // console.log(pass);
  // await db.searchUser(user);
  let query = {};
  // eslint-disable-next-line max-len
  const select = `SELECT * FROM logintable WHERE usr->>'email' = $1 AND usr->>'password' = $2`;
  query = {
    text: select,
    values: [user, password],
  };
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    res.status(200).json(rows[0]);
  } else {
    res.status(401).send('Username or password incorrect');
  }
};
