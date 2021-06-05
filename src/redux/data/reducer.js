import {
  DATA_UPDATE,
  UPDATE_START,
  UPDATE_PAUSE,
  RESET_GAME,
} from "../action-types";
import { dataInitialState } from "../../data/data-initial-state";

const dataReducer = (state = dataInitialState, action) => {
  switch (action.type) {
    case DATA_UPDATE:
      return { ...state, gameData: action.payload };
    case UPDATE_START:
      return { ...state, start: action.payload };
    case UPDATE_PAUSE:
      return { ...state, pause: action.payload };
    case RESET_GAME:
      return dataInitialState;

    default:
      return { ...state };
  }
};

export default dataReducer;
