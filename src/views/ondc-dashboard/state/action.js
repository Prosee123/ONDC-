import * as constants from './constants';

export function getSellerProducts(payload) {
    return {
        type: constants.GET_SELLER_PRODUCTS,
        payload
    }
}
export function verifyUserLogin(payload) {
    return {
        type: constants.VERIFY_USER_LOGIN,
        payload
    }
}