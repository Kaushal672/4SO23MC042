const { getNumbers } = require('../controllers/numbers');
const catchAsync = require('../utils/catchAsync');

const router = require('express').Router();

router.route('/:id').get(catchAsync(getNumbers));

module.exports = router;
