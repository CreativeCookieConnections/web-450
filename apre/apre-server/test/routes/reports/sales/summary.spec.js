/**
 * Author: Generated
 * Date: 2026-06-12
 * File: summary.spec.js
 * Description: Tests for the sales summary API
 */

const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

describe('Apre Sales Report API - Summary', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  it('should fetch total sales grouped by region', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { region: 'East', totalSales: 500 },
            { region: 'West', totalSales: 1200 }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/sales/summary');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { region: 'East', totalSales: 500 },
      { region: 'West', totalSales: 1200 }
    ]);
  });

  it('should return 200 and empty array if no summary data', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/sales/summary');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/sales/invalid-summary');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});
