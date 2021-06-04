import gameBoard from "./board";
import RandomObject from "./random-object";
import drawPlacedObjects from "./placed-objects-list";
import { idIndex } from "../../utils/helper-functions";

let fallingObject = null;
let fixedObject = null;
let placedObjects = [];
let paused = false;
function pauseState(pause) {
  paused = pause;
}
export const gameStart = () => {
  const canvas = document.getElementById("game-window");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    placedObjects = [];
    const initFixedObject = { x: null, y: null, id: -999, fixed: true };

    fixedObject = new RandomObject(initFixedObject);

    retrieveNewObject(ctx);
  }
};

const retrieveNewObject = (ctx) => {
  const newId = idIndex();
  const initFallingObjects = {
    x: Math.floor(gameBoard.width / 4),
    y: 100,
    id: newId,
    fixed: false,
  };
  fallingObject = new RandomObject(initFallingObjects);

  document.onkeydown = (e) => {
    let direction = null;
    switch (e.key) {
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      default:
        return null;
    }
    if (direction && !paused) {
      fallingObject.moveObject(ctx, direction, 10);
    }
  };
};

export const updateScreen = (ctx, canvas, pause) => {
  pauseState(pause);
  if (pause) return;

  // background
  //console.log("update");
  ctx.fillStyle = "#1c1273";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  //console.log(canvas.width,canvas.height)
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // border
  ctx.strokeStyle = "#e9f2ef";
  ctx.strokeRect(
    gameBoard.minX,
    gameBoard.minY,
    gameBoard.gameSizeX,
    gameBoard.gameSizeY
  );

  // controls
  ctx.fillStyle = "Aquamarine";
  ctx.font = `12px 'Arial'`;
  ctx.textAlign = "center";
  ctx.fillText("Controls", 60, 20);
  ctx.textAlign = "center";
  ctx.fillText("Arrow Keys", 60, 40);

  // title
  ctx.fillStyle = "CornflowerBlue";
  ctx.font = `20px 'Arial'`;
  ctx.textAlign = "center";
  ctx.fillText("Balancer", 320, 35);

  // teeter tooter triangle
  ctx.beginPath();
  ctx.moveTo(
    canvas.width / 2,
    gameBoard.maxY - gameBoard.thresHold + gameBoard.baseLimit + 10
  );
  ctx.lineTo(canvas.width / 2 + 25, gameBoard.maxY - gameBoard.thresHold + 100);
  ctx.lineTo(canvas.width / 2 - 25, gameBoard.maxY - gameBoard.thresHold + 100);
  ctx.closePath();
  ctx.fillStyle = "hsl(24, 100%, 20%)";
  ctx.fill();

  // teeter line
  ctx.beginPath();
  ctx.moveTo(
    gameBoard.minX + gameBoard.baseLimit,
    gameBoard.maxY - gameBoard.thresHold + gameBoard.baseLimit + 6
  );
  ctx.lineTo(
    gameBoard.maxX - gameBoard.baseLimit,
    gameBoard.maxY - gameBoard.thresHold + gameBoard.baseLimit + 6
  );
  ctx.lineTo(
    gameBoard.maxX - gameBoard.baseLimit,
    gameBoard.maxY - gameBoard.thresHold + gameBoard.baseLimit + 10
  );
  ctx.lineTo(
    gameBoard.minX + gameBoard.baseLimit,
    gameBoard.maxY - gameBoard.thresHold + gameBoard.baseLimit + 10
  );
  ctx.closePath();
  ctx.fillStyle = "hsl(12, 100%, 45%)";
  ctx.fill();

  //fixed object on the right hand side
  //console.log(placedObjects)
  if (fixedObject) {
    fixedObject.continousMove(ctx, 1);
    if (fixedObject.placed && !placedObjects.some((item) => item.id === -999)) {
      fixedObject.draw(ctx);
      const { x, y, id, value, objectType, center, specs } = fixedObject;
      placedObjects.push({ x, y, id, value, objectType, center, specs });
    }
  }

  if (placedObjects.length > 0) {
    drawPlacedObjects(placedObjects, ctx);
    ctx.font = `15px 'Arial'`;
  }
  if (fallingObject) {
    fallingObject.draw(ctx);
    let speed = 1;
    if (placedObjects.length > 5) {
      console.log(placedObjects.length);
      speed = 1.5;
    }
    fallingObject.continousMove(ctx, speed);
    // value
    ctx.fillStyle = "White";
    ctx.font = `15px 'Arial'`;

    ctx.fillText(
      fallingObject.value,
      fallingObject.center.x,
      fallingObject.center.y + 4
    );
    //console.log(fallingObject);
    if (fallingObject.placed) {
      const { x, y, id, value, objectType, center, specs } = fallingObject;
      placedObjects.push({ x, y, id, value, objectType, center, specs });

      retrieveNewObject(ctx);
    }
  }
};
