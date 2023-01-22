import { fromJS } from "immutable";
import { createReducerFromObject } from "../utils/miscellaneous/reducer-util";
import { STORE_SELLER_PRODUCTS, STORE_REGISTERED_USER_INFO } from "../views/ondc-dashboard/state/constants";

const initialState = fromJS({
    sellerOndcProducts: null,
    storeRegisteredUserInfo: null,
});

const reducerFunction = {
    [STORE_SELLER_PRODUCTS]: (state, payload) => {
        
        const { response, fromAction } = payload
        const { type, currentQuery } = fromAction
        let ondcData = null
        if (type === 'initial') {
            ondcData = state.set('sellerOndcProducts', fromJS({ ondcDt: response, ondcOrderArray:response.rows, totalRecords: response.all_records_count, currentQuery: currentQuery }))
        } 
        else if (type === 'pagination') {
            const prevData = state.get('sellerOndcProducts').toJS();
            let concatOndcDt = prevData.ondcOrderArray.concat(response.rows);
            ondcData = state.set('sellerOndcProducts', fromJS({ ondcDt: response, ondcOrderArray:concatOndcDt, totalRecords: response.all_records_count, currentQuery: currentQuery }))
        }
        return ondcData
    },
    [STORE_REGISTERED_USER_INFO]: (state, payload) => {
        let newState = state.set('storeRegisteredUserInfo', fromJS(payload));
        localStorage.setItem('login_access_token',payload.tokens.refresh.token)
        return newState;
    },
};


const dashboardReducer = createReducerFromObject(
    reducerFunction,
    initialState
);
export default dashboardReducer;
