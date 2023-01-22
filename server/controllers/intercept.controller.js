const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const { authService, userService, tokenService, emailService, interceptService } = require('../services');

const index = catchAsync(async (req, res) => {
  const mappedResponse = await interceptService.processInterceptRequest(req.body);
  if(mappedResponse){
    res.status(mappedResponse.status).send(mappedResponse.body);
  }else{
    res.status(httpStatus.BAD_REQUEST).send({message:'Invalid Request'});
  }
});
module.exports={
    index
}