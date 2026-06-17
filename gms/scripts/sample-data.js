/**
 * Author: Aisha Keller
 * Date: June 16 2026
 * File: sample-data.js
 * Description: sample data for gm
 */

const mongoose = require('mongoose');
const { Garden } = require('../models/garden');
const { Plant } = require('../models/plant');

// Connect to MongoDB

const connectionString =
'mongodb+srv://gm_user:s3cret@bellevueuniversity.bfy9zvm.mongodb.net/?appName=BellevueUniversity';

const dbName = 'gms';

async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString, {
            dbName: dbName
        });
        console.log('Connection to the database instance was successful');
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
}

connectToDatabase(); // Call the function to connect to the database

// Sample data for Garden
const sampleGardens = [
    {
        name: 'Rose Garden',
        location: 'Central Park',
        description: 'A beautiful garden with various types of roses'
    },
    {
        name: 'Vegetable Garden',
        location: 'Community Center',
        description: ' A community garden with a variety of vegetables.'
    }
];

// Sample data for Plant
const samplePlants = [
    {
        name: 'Tomato',
        type: 'Vegetable',
        status: 'Planted',
        datePlanted: new Date('2023-04-15'),
        gardenName: 'Vegetable Garden' // Temporary property to map gardenId
    },
    {
        name: 'Rose',
        type: 'Flower',
        status: 'Growing',
        datePlanted: new Date('2023-03-10'),
        gardenName: 'Rose Garden' // Temporary property to map gardenId
    }
];

// Function to create sample data
async function createSampleData () {
    try {
        // Clear existing data
        await Garden.deleteMany({});
        await Plant.deleteMany({});

        // Insert sample gardens and store their IDs
        const gardenIdMap = {};
        for (const gardenData of sampleGardens) {
            const garden = new Garden(gardenData);
            await garden.save();
            gardenIdMap[garden.name] = garden.gardenId;
            console.log('Sample garden created:', garden);
        }

        // Update samplePants with the correct gardenId values
        const updatedSamplePlants = samplePlants.map(plant => ({
            ...plant,
            gardenId: gardenIdMap[plant.gardenName]
        }));

        console.log('Updated sample plants:', updatedSamplePlants);

        for (const plantData of updatedSamplePlants) {
            const plant = new Plant(plantData);
            await plant.save();
            console.log('Sample plant created', plant);
        }

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error creating sample data', err);
    }
}

// Run the function to create sample data
createSampleData();
