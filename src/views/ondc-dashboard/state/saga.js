import { put, takeLeading } from 'redux-saga/effects'
import * as constants from './constants';
import * as api from './api';

function* getSellerProducts({ payload }) {
    try {
        // const response = yield api.getSellerOndcOrdersApi(payload);
        const response = [
            {
                "id": 22983,
                "buyer_np_name": null,
                "seller_np_name": "Karthik Test Store - ONDC",
                "created_at": "2022-12-30T13:09:08.832+05:30",
                "updated_at": "2023-01-06T17:24:26.289+05:30",
                "network_order_id": "2022-11-30-380053",
                "network_transaction_id": null,
                "seller_np_order_id": "10071",
                "seller_np_type": "ISN",
                "order_status": "New",
                "name_of_seller": "Karthik Test Store - ONDC",
                "seller_pincode": "600015",
                "sku_name": "Sofit Protein Cookies - Mango & Almond, 100 gm NNKTest 1",
                "sku_code": null,
                "product_price": "30.0",
                "order_category": "Grocery Store",
                "shipped_at": null,
                "delivered_at": null,
                "delivery_type": "PICKUP",
                "logistics_network_order_id": null,
                "logistics_network_transaction_id": null,
                "delivery_city": "Kalara",
                "delivery_pincode": null,
                "cancelled_at": null,
                "cancelled_by": null,
                "cancellation_reason": null,
                "total_order_value": "30.0"
            },
            {
                "id": 22977,
                "buyer_np_name": null,
                "seller_np_name": "Karthik Test Store - ONDC",
                "created_at": "2022-12-28T21:54:46.472+05:30",
                "updated_at": "2023-01-06T17:24:27.606+05:30",
                "network_order_id": "2022-11-28-794670",
                "network_transaction_id": null,
                "seller_np_order_id": "10070",
                "seller_np_type": "ISN",
                "order_status": "New",
                "name_of_seller": "Karthik Test Store - ONDC",
                "seller_pincode": "600015",
                "sku_name": "Sofit Protein Cookies - Mango & Almond, 100 gm NNKTest 1",
                "sku_code": null,
                "product_price": "30.0",
                "order_category": "Grocery Store",
                "shipped_at": null,
                "delivered_at": null,
                "delivery_type": "PICKUP",
                "logistics_network_order_id": null,
                "logistics_network_transaction_id": null,
                "delivery_city": "Ranipet District",
                "delivery_pincode": null,
                "cancelled_at": null,
                "cancelled_by": null,
                "cancellation_reason": null,
                "total_order_value": "60.0"
            },
        ]

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
