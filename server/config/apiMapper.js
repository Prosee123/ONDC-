const { omit } = require('lodash');

function apiMapper(requestBody) {
  switch (requestBody.name) {
    case 'R_GET_ONDC_ORDERS':
    case 'R_GET_ONDC_ORDERS_CSV':
      return {
        method: 'post',
        params: { ...requestBody.params },
        data: omit(requestBody, ['params', 'name']),
        url: 'order-ms/ondc_dashboard/orders',
      };
    default:
      return null;
  }
}
module.exports = apiMapper;
