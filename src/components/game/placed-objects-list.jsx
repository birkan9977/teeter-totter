import { drawCircle, drawRectangle, drawTriangle } from "./draw-functions";
import gameBoard from "./board";
const drawPlacedObjects = (list, ctx) => {
  const y = gameBoard.maxY - gameBoard.thresHold;
  list.forEach((item) => {
    switch (item.objectType) {
      case "circle":
        {
          const maxRadius = 19;
          const { radius, color } = item.specs;

          const baseCorrection = maxRadius - 2 * radius + 7;

          drawCircle(ctx, item.x, y + baseCorrection, radius, color);
          ctx.fillStyle = "White";
          ctx.font = `15px 'Arial'`;
          ctx.fillText(
            item.value,
            item.x + radius,
            y + baseCorrection + radius + 6
          );
        }
        break;
      case "rectangle":
        {
          const { width, height, color } = item.specs;
          const maxHeight = 26;
          const baseCorrection = maxHeight - height;
          drawRectangle(ctx, item.x, y + baseCorrection, width, height, color);
          ctx.fillStyle = "White";
          ctx.font = `15px 'Arial'`;
          ctx.fillText(
            item.value,
            item.center.x,
            y + baseCorrection + height / 2 + 4
          );
        }
        break;
      case "triangle":
        const { height, color } = item.specs;
        const maxHeight = 26;
        const baseCorrection = maxHeight - height;
        drawTriangle(ctx, item.x, y + baseCorrection, height, color);
        ctx.fillStyle = "White";
        ctx.font = `15px 'Arial'`;
        ctx.fillText(
          item.value,
          item.center.x,
          y + baseCorrection + height / 2 + 7
        );
        break;
      default:
        return null;
    }
  });
};

export default drawPlacedObjects;
