import request from '../../../utils/request';

export const getSellerOndcOrdersApi = (payload) => {
  const options = {
    name: 'R_GET_ONDC_ORDERS',
    method: 'post',
    ...payload,
  };
  return request(options);
};
export const exportOrderCSVApi = (payload) => {
  const options = {
    name: 'R_GET_ONDC_ORDERS_CSV',
    params: { format: 'csv' },
    method: 'post',
    data: payload,
  };
  return request(options, { Accept: 'text/csv' });
};
export const verifyUserLoginApi = (payload) => {
  const options = {
    url: `/v1/auth/login`,
    method: 'post',
    data: payload,
  };
  return request(options);
};

export const onUserLogout = (payload) => {
  const options = {
    url: `/v1/auth/logout`,
    method: 'post',
    data: payload,
  };
  return request(options);
};
