import useCanvas from "./hooks/useCanvas";
import utils from "./utils";

const Canvas = (props) => {
  const { draw, options, pause, ...rest } = props;
  const { context, ...config } = options;
  const { predraw, postdraw } = utils;
  const canvasRef = useCanvas(draw, options, pause, predraw, postdraw);

  return <canvas id="game-window" ref={canvasRef} {...rest} />;
};

export default Canvas;
