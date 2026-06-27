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

// GET request to return a plant document by Id.
router.get('/:id', async (req, res, next) => {
    try {
        const plant = await Plant.findOne({_id:req.params.params.id});
        res.send(plant);
    } catch (err) {
        console.error(`Error while getting plant by id: ${err}`);
        next(err);
    }
});

//

module.exports = router;