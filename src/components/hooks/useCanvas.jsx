import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { updateStart, updateData } from "../../redux/data/actions";

import { getGameStatus, restoreGameInits } from "../game/game-controls";
const useCanvas = (draw, options = {}, predraw, postdraw, pause) => {
  const start = useAppSelector((state) => state.dataReducer.start);

  const dispatch = useAppDispatch();

  const canvasRef = useRef(null);

  const handleUpdateStart = () => {
    dispatch(updateStart(false));
  };
  const handleUpdateData = (game) => {
    dispatch(updateData(game));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || "2d");
    let animationFrameId;

    const render = () => {
      if (pause) {
        console.log("paused");
        window.cancelAnimationFrame(animationFrameId);
        draw(context, canvas, pause);
        const game = getGameStatus();
        dispatch(updateData(game));
        return pause;
      }
      predraw(context, canvas);
      const game = getGameStatus();
      if (!pause && game?.end?.status !== "ended" && start) {
        draw(context, canvas, pause);
      }

      if (!start) {
        window.cancelAnimationFrame(animationFrameId);
      }
      if (game?.end?.status === "ended") {
        window.cancelAnimationFrame(animationFrameId);
        console.log("gameEnd");
        handleUpdateStart();
        handleUpdateData(game);
        restoreGameInits();
      } else {
        animationFrameId = window.requestAnimationFrame(render);
      }
      postdraw(context);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, pause]);

  return canvasRef;
};

export default useCanvas;
