// const e = require('express');
const db = require('./db');

exports.postUser = async (req, res) => {
  const success = await db.insertUser(req.body);
  if (success === 201) {
    res.status(201).send('Successfully created account');
  } else {
    res.status(409).send('Email Already Exists');
  }
};

exports.getUsers = async (req, res) => {
  const users = await db.selectUsers(req.body);
  // console.log(users);
  res.status(200).json(users);
};
