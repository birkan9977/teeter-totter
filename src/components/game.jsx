import Canvas from "./canvas";
import { useEffect, useState } from "react";
import { gameStart, updateScreen } from "./game/game-controls";

const Game = () => {
  const [pause, setPause] = useState(false);
  const [start, setStart] = useState(false);

  const options = {
    context: "2d",
  };
  const handlePause = () => {
    setPause(!pause);
  };
  const handleStart = () => {
    setStart(!start);
  };

  useEffect(() => {
    gameStart();
  }, [start]);

  return (
    <div className="game-container">
      <div className="controls">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStart}>Start</button>
      </div>
      {1 && (
        <Canvas
          draw={updateScreen}
          pause={pause}
          width={640}
          height={480}
          options={options}
        />
      )}
    </div>
  );
};

export default Game;
