import { all } from "redux-saga/effects";
import dataSaga from "./data/saga";

export default function* rootSaga() {
  yield all([dataSaga()]);
}
