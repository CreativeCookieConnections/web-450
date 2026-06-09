var express = require('express');
var router = express.Router();
const { composerService } = require('../model');

router.get('/', async function(req, res, next) {
  try {
    const composers = await composerService.getAllComposers();
    res.json(composers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
