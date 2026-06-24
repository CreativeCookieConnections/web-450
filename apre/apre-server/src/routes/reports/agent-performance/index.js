/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre agent performance API for the agent performance reports
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

const router = express.Router();

/**
 * @description
 *
 * GET /call-duration-by-date-range
 *
 * Fetches call duration data for agents within a specified date range.
 *
 * Example:
 * fetch('/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/call-duration-by-date-range', (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, 'Start date and end date are required'));
    }

    console.log('Fetching call duration report for date range:', startDate, endDate);

    mongo(async db => {
      const data = await db.collection('agentPerformance').aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            totalCallDuration: { $sum: '$callDuration' }
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            callDuration: '$totalCallDuration'
          }
        },
        {
          $group: {
            _id: null,
            agents: { $push: '$agent' },
            callDurations: { $push: '$callDuration' }
          }
        },
        {
          $project: {
            _id: 0,
            agents: 1,
            callDurations: 1
          }
        }
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error('Error in /call-duration-by-date-range', err);
    next(err);
  }
});

/**
 * Author: Aisha Keller
 * Date: 06/23/2026
 * File: index.js
 * Description: m-090 Apre agent performance API for fetching agent performance data by metric type.
 */

/**
 * @description
 *
 * GET /by-metric-type
 * 
 * Fetches agent performance data based on a specified metric type and date range.
 *
 * Example:
 * fetch('/by-metric-type?metricType=callDuration&startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/by-metric-type', (req, res, next) => {
  try {
    const { startDate, endDate, metricType } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, 'Start date and end date are required'));
    }

    if (!metricType) {
      return next(createError(400, 'Metric type is required'));
    }

    const metricMap = {
      callDuration: {
        accumulator: { $sum: '$callDuration' },
        outputField: 'value'
      },
      averagePerformance: {
        accumulator: {
          $avg: {
            $avg: '$performanceMetrics.value'
          }
        },
        outputField: 'value'
      },
      feedbackCount: {
        accumulator: {
          $sum: {
            $size: {
              $ifNull: ['$customerFeedback', []]
            }
          }
        },
        outputField: 'value'
      }
    };

    if (!metricMap[metricType]) {
      return next(createError(400, `Unsupported metric type: ${metricType}`));
    }

    console.log('Fetching agent performance report for metric type:', metricType, 'and date range:', startDate, endDate);

    mongo(async db => {
      const data = await db.collection('agentPerformance').aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            metricValue: metricMap[metricType].accumulator
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            value: '$metricValue'
          }
        },
        {
          $group: {
            _id: null,
            agents: { $push: '$agent' },
            values: { $push: '$value' }
          }
        },
        {
          $project: {
            _id: 0,
            metricType: metricType,
            agents: 1,
            values: 1
          }
        }
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error('Error in /by-metric-type', err);
    next(err);
  }
});

module.exports = router;