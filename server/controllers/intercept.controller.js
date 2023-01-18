const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const { authService, userService, tokenService, emailService } = require('../services');

const index = catchAsync(async (req, res) => {
    
  res.status(httpStatus.CREATED).send({ user, tokens });
});
module.exports={
    index
}