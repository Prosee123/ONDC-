function apiMapper(requestBody) {
  switch (requestBody.name) {
    case 'R_GET_ONDC_ORDERS':
      return { method: 'post', params: requestBody.params, url: 'order-ms/ondc_dashboard/orders' };
    case 'R_GET_ONDC_ORDERS_CSV':
      return { method: 'post', params: requestBody.params, url: 'order-ms/ondc_dashboard/orders' };
    default:
      return null;
  }
}
module.exports = apiMapper;
