const {Pool} = require('pg');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.json');
var bcrypt = require('bcrypt');
var db = require('./db');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.authenticate = async (req, res) => {
  const user = await db.getUser(req.body);

  if (user.length != 0 && bcrypt.compareSync(req.body.password, user[0].usr.password)) {
    const accessToken = jwt.sign(
      {email: user[0].usr.email}, 
      secrets.accessToken, {
        // expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({name: user[0].usr.name, accessToken: accessToken});
  } else {
    res.status(401).send();
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
