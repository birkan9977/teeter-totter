import { all, fork, takeEvery, select } from "redux-saga/effects";
import { getDataState } from "../selectors";
import { DATA_UPDATE } from "../action-types";

export function* dataUpdated() {
  const dataState = yield select(getDataState);
  yield console.log(dataState);
  //this saga can be used to update player details asynchronously
}

export function* watchChangeData() {
  yield takeEvery(DATA_UPDATE, dataUpdated);
}

function* dataSaga() {
  yield all([fork(watchChangeData)]);
}

export default dataSaga;
