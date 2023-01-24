const { default: axios } = require('axios');
const apiMapper = require('../config/apiMapper');
const { gateway,gatewayClientToken } = require('../config/config');

const processInterceptRequest = async (requestPayload) => {
  const mappedObj = apiMapper(requestPayload);
  if (mappedObj) {
    const options = {
      url: `${gateway}/${mappedObj.url}`,
      method: mappedObj.method,
      data: mappedObj.params,
      headers: {
        Accept: '*/*',
        // 'Content-Disposition': "attachment",
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        ...(gatewayClientToken && { 'Client-Token': gatewayClientToken }),
      },
    };
    console.log(options);
    return axios(options)
      .then((res) => {
        return { status: res.status, body: res.data };
      })
      .catch((err) => {
        console.error('intercept.service.error:', err);
        const errorObj = {};
        if (err.data) {
          errorObj.status = err.data.status;
          errorObj.body = err.data;
        } else {
          errorObj.status = 415;
          errorObj.body = '';
        }
        return errorObj;
      });
  } else {
    return null;
  }
};
module.exports = {
  processInterceptRequest,
};
