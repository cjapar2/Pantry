const db = require('./db');

exports.getLists = async (req, res) => {
  const items = await db.selectLists();
  res.status(200).json(items);
};

exports.getUsersToLists = async (req, res) => {
  const items = await db.selectUsersToLists();
  res.status(200).json(items);
};

// Given a user id, gets all lists that user has access to
exports.getUsersLists = async (req, res) => {
  const listIDs = await db.getAllListsOfUser(req.params.usr_id);
  const lists = await db.getTheseLists(listIDs);
  res.status(200).json(lists);
};

// Create a new list (by given user)
exports.newList = async (req, res) => {
  console.log(req);
  const newList = await db.createList(req.body);
  await db.createUserListConc(req.params.usr_id, newList[0].id);
  res.status(201).json(newList);
};

// Given a list id, gets all users who have access to that list
exports.getListsUsers = async (req, res) => {
  const userIDs = await db.getAllUsersOfList(req.params.list_id);
  const users = await db.getTheseUsers(userIDs);
  res.status(200).json(users);
};