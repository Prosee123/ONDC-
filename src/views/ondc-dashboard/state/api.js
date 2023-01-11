import request from "../../../utils/request";

export const getSellerOndcOrdersApi = (payload) => {

    const options = {
      url: 'order-ms/ondc_dashboard/orders',
      method: 'post',
      params: null,
    }
    return request(options);
  }