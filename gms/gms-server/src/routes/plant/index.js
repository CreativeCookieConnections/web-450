const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const { Plant } = require('../../models/plant');
const { addPlantSchema } = require('../../schemas/plant');
const router = express.Router();

const ajv = new Ajv();
const validateAddPlant = ajv.compile(addPlantSchema);

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

// POST request to add a new plant document to the collection.
router.post('/', async (req, res, next) => {
    try {
        const valid = validateAddPlant(req.body);

        if (!valid) {
            return next(createError(400, ajv.errorsText(validateAddPlant.errors)));
        }
        
        const payload = {
            ...req.body,
            gardenId: req.params.gardenId
        }
        const plant = new Plant(payload);
        await plant.save();

        res.send({
            message: 'Plant created successfully',
            id: plant._id
        });
        } catch (err) {
            console.error(`Error while creating plant: ${err}`);
            next(err);
        }
});

// PATCH request to update a plant document in the plants collection.
router.patch('/:id', async (req, res, next) => {
    try {
        const plant = await Plant.findOneAndUpdate({_id:req.params.plantId});
        plant.set(req.body);

        await plant.save();

        res.send({
            message: 'Plant updated successfully',
            id: plant._id
        });
    } catch (err) {
        console.error(`Error while updating plant: ${err}`);
        next(err);
    }
});

// DELETE request to delete a plant document in the plants collection.
router.delete('/:id', async (req, res, next) => {
    try {
        await Plant.deleteOne({_id:req.params.plantId});
        
        res.send({
            message: 'Plant deleted successfully',
            id: req.params.plantId
        });
    } catch (err) {
        console.error(`Error while deleting plant: ${err}`);
        next(err);
    }
});

module.exports = router;