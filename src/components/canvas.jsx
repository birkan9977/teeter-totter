import useCanvas from "./hooks/useCanvas";
import utils from "./utils";

const Canvas = (props) => {
  const { draw, options, pause, ...rest } = props;
  const { predraw, postdraw } = utils;
  const canvasRef = useCanvas(draw, options, predraw, postdraw, pause);

  return <canvas id="game-window" ref={canvasRef} {...rest} />;
};

export default Canvas;
