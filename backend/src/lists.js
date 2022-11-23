const db = require('./db');

exports.getLists = async (req, res) => {
  const lists = await db.selectLists();
  res.status(200).json(lists);
};

// Given a user id, gets all lists that user has access to
exports.getUsersLists = async (req, res) => {
  const user = await db.findUser(req.params.usr_id);
  if (!user) {
    res.status(400).send();
    return;
  }
  const listIDs = await db.getAllListsOfUser(req.params.usr_id);
  if (listIDs.length === 0) {
    res.status(200).json([]);
    return;
  }
  const lists = await db.getTheseLists(listIDs);
  res.status(200).json(lists);
};

// Create a new list (by given user)
exports.newList = async (req, res) => {
  const user = await db.findUser(req.params.usr_id);
  if (!user) {
    res.status(400).send();
    return;
  }
  const newList = await db.createList(req.body);
  const conc = await db.createUserListConc(req.params.usr_id, newList.id);
  res.status(201).json(newList);
};

// Given a list id, gets all users who have access to that list
exports.getListsUsers = async (req, res) => {
  const list = await db.findList(req.params.list_id);
  if (!list) {
    res.status(400).send();
    return;
  }
  const userIDs = await db.getAllUsersOfList(req.params.list_id);
  if (userIDs.length === 0) {
    res.status(200).json([]);
    return;
  }
  const users = await db.getTheseUsers(userIDs);
  res.status(200).json(users);
};

exports.getUsersToLists = async (req, res) => {
  const usersToLists = await db.selectUsersToLists();
  res.status(200).json(usersToLists);
};

exports.newUserListConc = async (req, res) => {
  const user = await db.findUser(req.body.usr_id);
  if (!user) {
    res.status(400).send();
    return;
  }
  const list = await db.findList(req.body.list_id);
  if (!list) {
    res.status(400).send();
    return;
  }
  const conc = await db.createUserListConc(req.body.usr_id, req.body.list_id);
  res.status(201).json(conc);
};

exports.removeList = async (req, res) => {
  await db.deleteList(req.params.list_id);
  res.status(204).send();
}
