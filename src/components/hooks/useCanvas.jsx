import { useRef, useEffect } from "react";

const useCanvas = (draw, options = {}, pause, predraw, postdraw) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || "2d");
    let animationFrameId;

    const render = () => {
      if (pause) {
        console.log("paused");
        window.cancelAnimationFrame(animationFrameId);
        draw(context, canvas, pause);
        return;
      }
      predraw(context, canvas);
      draw(context, canvas, pause);
      postdraw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, pause]);

  return canvasRef;
};

export default useCanvas;
