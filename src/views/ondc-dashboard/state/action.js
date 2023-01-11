import * as constants from './constants';

export function getSellerProducts(payload) {
    return {
        type: constants.GET_SELLER_PRODUCTS,
        payload
    }
}