const express = require('express');
const { interceptController } = require('../../controllers');
const router = express.Router();

router.route('/').post(interceptController.index);

module.exports = router;