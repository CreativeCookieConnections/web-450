const express = require('express');
const { Plant } = require('../../models/plant');
const router = express.Router();

//GET all plants
router.get('/', async (req, res, next) => {
    try {
        const plants = await Plant.find();
        res.send(plants);
    } catch (err) {
        next(err);
        console.error(`Error while getting plants: ${err}`);
        next(err);
    }
});

module.exports = router;