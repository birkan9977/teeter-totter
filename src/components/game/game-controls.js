import gameBoard from "./board";
import RandomObject from "./random-object";
import drawPlacedObjects from "./placed-objects-list";
import { idIndex } from "../../utils/helper-functions";
import calculateMomentum from "./calculate";

let fallingObject = null;
let fixedObject = null;
let placedObjects = [];
let paused = false;
let deg = 0;
let prevDeg = 0;
let bending = false;
let simDeg = 0;
let simPrevDeg = 0;
let game = {};
function pauseState(pause) {
  paused = pause;
}

export const gameStart = (gameInits) => {
  game = gameInits;
  restoreGameInits();
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
    if (direction && !paused && fallingObject) {
      fallingObject.moveObject(ctx, direction, 10);
    }
  };
};

export const updateScreen = (ctx, canvas, pause) => {
  pauseState(pause);
  if (pause) return;

  // background
  ctx.fillStyle = "#1c1273";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  //fixed object on the right hand side
  if (fixedObject) {
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
    if (fallingObject.placed) {
      const { x, y, id, value, objectType, center, specs } = fallingObject;
      placedObjects.push({ x, y, id, value, objectType, center, specs });

      retrieveNewObject(ctx);
      bending = false;
    }

    const calculations = calculateMomentum(placedObjects);

    if (!bending) {
      prevDeg = deg;
    }
    if (calculations.left.slope < calculations.right.slope) {
      deg = Math.max(calculations.left.slope, calculations.right.slope);
    } else {
      deg = Math.min(calculations.left.slope, calculations.right.slope);
    }

    //game rules
    if (
      Math.abs(calculations.left.momentum - calculations.right.momentum) > 20 &&
      placedObjects.length > 1
    ) {
      game = {
        ...game,
        end: {
          status: "ended",
          reason: "rule violation: Momentum Difference greater than 20kgm",
        },
      };
    }

    if (
      Math.floor(calculations.left.momentum) -
        Math.floor(calculations.right.momentum) ===
        0 &&
      placedObjects.length > 1
    ) {
      game = {
        ...game,
        end: {
          status: "ended",
          reason: "Success: Teeter Totter Balanced!!!",
        },
      };
    }

    if (deg < 30 && deg > -30) {
      if (!bending) {
        bending = true;
        simDeg = deg;
        simPrevDeg = prevDeg;
      }

      ctx.save(); // save canvas

      const step = 0.2;
      ctx.rotate((simPrevDeg * Math.PI) / 180); // rotate canvas
      if (simDeg < simPrevDeg) {
        simPrevDeg -= step;
      }
      if (simDeg > simPrevDeg) {
        simPrevDeg += step;
      }

      //M360 316 center
      //3 deg -25, 25
      //2 deg -30,30
      //1deg -35,35
      //0 deg -40,40
      //-1 deg -45,45
      //-2 deg -55,55
      //-3 deg -60,60

      ctx.beginPath();
      //let p = new Path2D("M360 316 h 300 v -4 h -600 v4 Z");
      let path = new Path2D("M360 316 h 300 v -4 h -600 v4 Z");
      ctx.fillStyle = "hsl(12, 100%, 45%)";
      ctx.translate(-40 + simPrevDeg * 5, 45 - 5 * simPrevDeg);

      ctx.fill(path);
      ctx.restore(); // restore canvas
    } else {
      game = {
        ...game,
        end: {
          status: "ended",
          reason: "rule violation: Bending degree greater than 30%",
        },
      };
    }
    ctx.beginPath();
    ctx.fillStyle = "CornflowerBlue";
    ctx.font = `14px 'Arial'`;
    ctx.textAlign = "center";
    ctx.fillText(
      `Total Weight: ${Math.floor(calculations.left.weight)}`,
      200,
      410
    );

    ctx.beginPath();
    ctx.fillText(
      `Momentum: ${Math.floor(calculations.left.momentum)}`,
      200,
      440
    );

    ctx.beginPath();
    ctx.fillText(
      `Total Weight: ${Math.floor(calculations.right.weight)}`,
      440,
      410
    );

    ctx.beginPath();
    ctx.fillText(
      `Momentum: ${Math.floor(calculations.right.momentum)}`,
      440,
      440
    );
  }

  game = {
    ...game,
    status: {
      pause: pause,
    },

    gameObjects: {
      placedObjects: placedObjects,
    },
  };
};

export const getGameStatus = () => {
  return game;
};

export const restoreGameInits = () => {
  fallingObject = null;
  fixedObject = null;
  placedObjects = [];
  deg = 0;
  prevDeg = 0;
  bending = false;
  simDeg = 0;
  simPrevDeg = 0;
  game = {};
};
