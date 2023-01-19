import { combineReducers } from "redux";
import dashboardReducer from "../reducers.js/dashboard-reducer";

const IndexReducer = combineReducers({
    dashboardReducer,
});

export default IndexReducer; 