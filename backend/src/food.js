const db = require('./db');

// Old get food (gets all food in food)
exports.getFood = async (req, res) => {
  const items = await db.selectFood(req.body);
  res.status(200).json(items);
};

// New get food (gets all food given a list ID)
exports.getFoodOfList = async (req, res) => {
  const list = await db.findList(req.params.list_id);
  if (!list) {
    res.status(404).send();
    return;
  }
  const food = await db.selectFoodOfList(req.params.list_id);
  res.status(200).json(food);
};

// Old post food
exports.postFood = async (req, res) => {
  const success = await db.insertFood(req.body);
  if (success === 201) {
      res.status(201).send(req.body);
  } else {
      res.status(409).send();
  }
};

// New post food
exports.postFoodInList = async (req, res) => {
  const list = await db.findList(req.params.list_id);
  if (!list) {
    res.status(400).send();
    return;
  }
  const food = await db.insertFoodInList(req.params.list_id, req.body);
  res.status(201).send(food);
};

exports.putFood = async (req, res) => {
  const food = await db.updateFood(req.params.id, req.body);
  res.status(200).send(food);
};

exports.deleteFood = async (req, res) => {
  await db.deleteFood(req.params.id);
  res.status(204).send();
};