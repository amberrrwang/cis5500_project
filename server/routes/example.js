const express = require('express');
const router = express.Router();
const { getHealthState } = require('../controllers/exampleController');


// add routes related to a specific service here, it will link to controller.
router.get('/health', getHealthState);

module.exports = router;
