const db = require('./db');

exports.getFood = async (req, res) => {
    const items = await db.selectFoodItems(req.body);
    res.status(200).json(items);
};

exports.postFood = async (req, res) => {
    const success = await db.insertFood(req.body);
    if (success === 201) {
        console.log('test');
        res.status(201).send(req.body);
    } else {
        res.status(409).send();
    }
};