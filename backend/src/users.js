// const e = require('express');
const db = require('./db');

exports.getUsers = async (req, res) => {
  const users = await db.selectUsers();
  res.status(200).json(users);
};

exports.postUser = async (req, res) => {
  const findUser = await db.getUser(req.body);
  if (findUser) {
    res.status(409).send('Email Already Exists');
    return;
  }
  const user = await db.insertUser(req.body);
  res.status(201).send(user);
};
