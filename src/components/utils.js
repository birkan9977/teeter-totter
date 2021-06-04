import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";

//Correction for high pixel density devices and window resize
function resizeCanvas(context, canvas) {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
}

const predraw = (context, canvas) => {
  context.save();
  resizeCanvas(context, canvas);
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
};

const postdraw = (ctx) => {
  ctx.restore();
};

const utils = { predraw, postdraw };

export default utils;
