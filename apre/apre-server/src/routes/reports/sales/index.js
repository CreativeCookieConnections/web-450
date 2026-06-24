/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre sales report API for the sales reports
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');

const router = express.Router();

/**
 * @description
 *
 * GET /regions
 *
 * Fetches a list of distinct sales regions.
 *
 * Example:
 * fetch('/regions')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions', (req, res, next) => {
  try {
    mongo (async db => {
      const regions = await db.collection('sales').distinct('region');
      res.send(regions);
    }, next);
  } catch (err) {
    console.error('Error getting regions: ', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /regions/:region
 *
 * Fetches sales data for a specific region, grouped by salesperson.
 *
 * Example:
 * fetch('/regions/north')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions/:region', (req, res, next) => {
  try {
    mongo (async db => {
      const salesReportByRegion = await db.collection('sales').aggregate([
        { $match: { region: req.params.region } },
        {
          $group: {
            _id: '$salesperson',
            totalSales: { $sum: '$amount'}
          }
        },
        {
          $project: {
            _id: 0,
            salesperson: '$_id',
            totalSales: 1
          }
        },
        {
          $sort: { salesperson: 1 }
        }
      ]).toArray();
      res.send(salesReportByRegion);
    }, next);
  } catch (err) {
    console.error('Error getting sales data for region: ', err);
    next(err);
  }
});

/**
 * @description
 * 
 * GET /monthly-sales
 * 
 * Fetches total sales amount grouped by month.
 * 
 * Example:
 * fetch('/monthly-sales')
 * .then(response => response.json())
 * .then(data => console.log(data));
 */

router.get('/monthly-sales', (req, res, next) => {
  try {
    mongo(async db => {
      const monthlySales = await db.collection('sales').aggregate([
        {
          $addFields: {
            monthLabel: {
              $ifNull: [
                '$month',
                {
                  $ifNull: [
                    {
                      $cond: [
                        { $eq: [{ $type: '$date' }, 'date'] },
                        { $dateToString: { format: '%B', date: '$date' } },
                        {
                          $cond: [
                            { $eq: [{ $type: '$date' }, 'string'] },
                            {
                              $dateToString: {
                                format: '%B',
                                date: {
                                  $dateFromString: {
                                    dateString: '$date',
                                    onError: null,
                                    onNull: null
                                  }
                                }
                              }
                            },
                            null
                          ]
                        }
                      ]
                    },
                    'Unknown'
                  ]
                }
              ]
            }
          }
        },
        {
          $group: {
            _id: '$monthLabel',
            totalSales: { $sum: '$amount' }
        }
        },

        {
          $project: {
            _id: 0,
            month: '$_id',
            totalSales: 1,
            monthOrder: {
              $indexOfArray: [
                [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ],
                '$_id'
              ]
            }
          }
        },

        {
          $sort: { monthOrder: 1 }
        },

        {
          $project: {
            monthOrder: 0
          }
        }
      ]).toArray();
      res.send(monthlySales);
    }, next);
  } catch (err) {
    console.error('Error getting monthly sales data: ', err);
    next(err);
  }
});

module.exports = router;