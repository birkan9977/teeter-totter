import {
  DATA_UPDATE,
  UPDATE_START,
  UPDATE_PAUSE,
  RESET_GAME,
} from "../action-types";

export const updateData = (value) => {
  const dataUpdateAction = {
    type: DATA_UPDATE,
    payload: value,
  };

  return dataUpdateAction;
};

export const updateStart = (value) => {
  const dataUpdateStartAction = {
    type: UPDATE_START,
    payload: value,
  };

  return dataUpdateStartAction;
};

export const updatePause = (value) => {
  const dataUpdatePauseAction = {
    type: UPDATE_PAUSE,
    payload: value,
  };

  return dataUpdatePauseAction;
};

export const resetGame = () => {
  const resetGameAction = {
    type: RESET_GAME,
  };

  return resetGameAction;
};
