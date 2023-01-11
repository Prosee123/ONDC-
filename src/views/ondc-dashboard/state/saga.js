import { put, takeLeading } from 'redux-saga/effects'
import * as constants from './constants';
import * as api from './api';

function* getSellerProducts({ payload }) {
    try {
        const response = yield api.getSellerOndcOrdersApi(payload);
        if (response) {
            yield put({ type: constants.STORE_SELLER_PRODUCTS, payload: response });
        }
    } catch (e) {
        console.log('error', e)
    }
}

export default function* DashboardSaga() {
    yield takeLeading(constants.GET_SELLER_PRODUCTS, getSellerProducts);
}
