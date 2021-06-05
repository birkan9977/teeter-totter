import Canvas from "./canvas";
import { useEffect } from "react";
import { gameStart, updateScreen } from "./game/game-controls";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updatePause, updateStart, resetGame } from "../redux/data/actions";
import { dataInitialState } from "../data/data-initial-state";
import "../styles/css/game.css";
const Game = () => {
  const start = useAppSelector((state) => state.dataReducer.start);
  const pause = useAppSelector((state) => state.dataReducer.pause);

  const gameData = useAppSelector((state) => state.dataReducer.gameData);

  const dispatch = useAppDispatch();

  const options = {
    context: "2d",
    gameType: "Single Player",
  };
  const handlePause = () => {
    dispatch(updatePause(!pause));
  };
  const handleStart = () => {
    dispatch(resetGame());
    dispatch(updateStart(!start));
    //dispatch(updatePause(false));
  };

  useEffect(() => {
    gameStart(dataInitialState.game);
  }, [start]);

  return (
    <div className="game-container">
      <div className="controls">
        <button onClick={handlePause}>{pause ? "Continue" : "Pause"}</button>
        <button onClick={handleStart}>{start ? "Stop" : "Start"}</button>
      </div>
      {start && (
        <Canvas
          draw={updateScreen}
          width={640}
          height={480}
          options={options}
          pause={pause}
        />
      )}
      {gameData?.end?.status === "ended" && (
        <div className="warning">{gameData.end.reason}</div>
      )}
    </div>
  );
};

export default Game;
