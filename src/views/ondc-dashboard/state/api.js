import request from "../../../utils/request";

export const getSellerOndcOrdersApi = (payload) => {

    const options = {
      // url: 'order-ms/ondc_dashboard/orders',
      url: 'https://dev-gateway-v2.ndh01.com/api/order-ms/ondc_dashboard/orders',
      method: 'post',
      data: payload,
    }
    return request(options);
  }
  export const verifyUserLoginApi = (payload) => {

    const options = {
      url: 'http://localhost:5001/v1/auth/login',
      method: 'post',
      data: payload,
    }
    return request(options);
  }
