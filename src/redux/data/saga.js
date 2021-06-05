import { all, call, fork, takeEvery, select, put } from "redux-saga/effects";
import { getDataState } from "../selectors";
import { DATA_UPDATE } from "../action-types";

export function* dataUpdated(action) {
  const payload = action.payload;
  const dataState = yield select(getDataState);
  yield console.log(dataState);
}

export function* watchChangeData() {
  yield takeEvery(DATA_UPDATE, dataUpdated);
}

function* dataSaga() {
  yield all([fork(watchChangeData)]);
}

export default dataSaga;
