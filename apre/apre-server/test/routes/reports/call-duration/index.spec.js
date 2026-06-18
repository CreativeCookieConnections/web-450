/**
 * Author: Aisha Keller
 * Date: June 18 2026
 * File: index.spec.js
 * Description: Test the call duration API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

// Test the call duration API
describe('Apre Call Duration API', () => {
    beforeEach(() => {
        mongo.mockClear();
    });

// Test 1: should fetch call duration data for agents within a specificed date range
it('should fetch call duration data for agents within a specified date range', async () => {
    mongo.mockImplementation(async (callback) => {
        const db = {
            collection: jest.fn().mockReturnThis(),
            aggregate: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([
                    {
                        agents: ['Agent A', 'Agent B'],
                        callDurations: [120, 90]
                    }
                ])
            })
        };

        await callback(db);
    });

    const response = await request(app). get('/api/reports/agent-performance/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31');

    expect (response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
        {
            agents: ['Agent A', 'Agent B'],
            callDurations: [120, 90]
        }
    ]);
});

// Test 2: should return 400 if startDate or endDate is missing
it('should return 400 if startDate or endDate is missing', async () => {
    const response = await request(app).get('/api/reports/agent-performance/call-duration-by-date-range?startDate=2023-01-01');

    expect(response.status).toBe(400); // Expect a 400 status code

    // Expect the response boyd to match the expected data
    expect(response.body).toEqual({
        message: 'Start date and end date are required',
        status: 400,
        type: 'error'
    });
});

// Test 3: should return 404 for an invalid endpoint
it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/agent-performance/invalid-endpoint');

    expect(response.status).toBe(404); // Expect a 404 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual({
        message: 'Not Found',
        status: 404,
        type: 'error'
    });
});
});