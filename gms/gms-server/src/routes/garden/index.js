const express = require('express');
const router = express.Router();
const { Garden } = require('../../models/garden');


// GET request to return a list of documents from the gardens collection.
router.get('/', async (req, res, next) => {
    try {
        const gardens = await Garden.find({});
        res.send(gardens);
    } catch (err) {
        console.error(`Error while getting gardens: ${err}`);
        next(err);
    }
});

// GET request to return a garden document by Id.
router.get('/:gardenId', async (req, res, next) => {
    try {
        const garden = await Garden.findOne({ gardenId: req.params.gardenId });
        res.send(garden);
    } catch (err) {
        console.error(`Error while getting garden: ${err}`);
        next(err);
    }
});

// POST request to create garden document to the garden collection.
router.post('/', async (req, res, next) => {
    try {
        const newGarden = new Garden(req.body);
        await newGarden.save();
        res.send({
            message: 'Garden created successfully',
            gardenId: newGarden.gardenId
        })
    } catch (err) {
        console.error(`Error while creating garden: ${err}`);
        next(err);
    }
});

//PATCH request to update a garden document by gardenId in the gardens collection.
router.patch('/:gardenId', async (req, res, next) => {
    try {
        const garden = await Garden.findOneAndUpdate({ gardenId: req.params.gardenId });
        garden.set({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description
        });

        await garden.save();

        res.send({
            message: 'Garden updated successfully',
            gardenId: garden.gardenId
        });
        } catch (err) {
            console.error(`Error while updateing garden: ${err}`);
            next(err);
        }
    });

// DELETE request to delete a garden document by gardenId in the gardens collection.
router.delete('/:gardenId', async (req, res, next) => {
    try {
        await Garden.deleteOne({ gardenId: req.params.gardenId });
        res.send({
            message: 'Garden deleted successfully',
            gardenId: req.params.gardenId
        });
    } catch (err) {
        console.error(`Error while deleting garden: ${err}`);
        next(err);  
        }
    });

module.exports = router;