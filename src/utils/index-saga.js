import { all } from 'redux-saga/effects';
import DashboardSaga from '../views/ondc-dashboard/state/saga';

function* IndexSaga() {
  yield all([
    DashboardSaga()
  ]);
}

export default IndexSaga;
