import { random } from "../../utils/helper-functions";
import gameBoard from "./board";
import { drawCircle, drawRectangle, drawTriangle } from "./draw-functions";

class RandomObject {
  constructor({ x, y, id, fixed }) {
    this.fixed = fixed;
    this.value = this.randomValue();
    if (fixed) {
      this.x = this.randomPosition();
      this.y = gameBoard.maxY - gameBoard.thresHold;
      this.placed = true;
    } else {
      this.x = x;
      this.y = y;
      this.placed = false;
    }

    this.id = id;

    this.objectType = this.randomObject();
    this.center = {};
    this.specs = {};
    this.color = this.randomColor();
  }

  randomPosition() {
    const xpos = random(
      (gameBoard.maxX / 3) * 2 + gameBoard.baseLimit,
      gameBoard.maxX - gameBoard.baseLimit - 20 - this.value
    );
    return xpos;
  }
  randomColor() {
    const hue = Math.floor(random(this.value, 200)) || 50;
    const saturation = 100;
    const light = 30;
    const color = `hsl(${hue}, ${saturation}%, ${light}%)`;
    return color;
  }
  randomValue() {
    if (this.fixed) {
      return random(5, 10);
    }
    return random(1, 10);
  }
  randomObject() {
    const randomNumber = random(1, 3);
    //randomNumber = 1;
    switch (randomNumber) {
      case 1:
        return "circle";
      case 2:
        return "rectangle";
      case 3:
        return "triangle";
      default:
        return null;
    }
  }

  draw(ctx) {
    if (this.objectType) {
      switch (this.objectType) {
        case "circle":
          {
            const radius = 6 + this.value;
            const center = drawCircle(ctx, this.x, this.y, radius, this.color);
            this.setObjectCenter(center);
            this.setSpecs("radius", radius);
            this.setSpecs("color", this.color);
          }
          break;
        case "rectangle":
          {
            const width = 22 + this.value;
            const height = 17 + this.value;
            const center = drawRectangle(
              ctx,
              this.x,
              this.y,
              width,
              height,
              this.color
            );
            this.setObjectCenter(center);
            this.setSpecs("color", this.color);
            this.setSpecs("width", width);
            this.setSpecs("height", height);
          }
          break;
        case "triangle":
          {
            const height = 17 + this.value;
            const center = drawTriangle(
              ctx,
              this.x,
              this.y,
              height,
              this.color
            );
            this.setObjectCenter(center);
            this.setSpecs("color", this.color);
            this.setSpecs("height", height);
          }
          break;
        default:
          drawRectangle(ctx, this.x, this.y);
      }
    }
  }

  setSpecs(key, value) {
    this.specs = {
      ...this.specs,
      [key]: value,
    };
  }

  setObjectCenter(center) {
    this.center = center;
  }
  getObjectCenter() {
    return this.center;
  }
  moveObject(ctx, key, speed) {
    if (!this.fixed) {
      switch (key) {
        case "down":
          this.y = Math.min(
            gameBoard.maxY - gameBoard.baseLimit,
            this.y + speed
          );
          this.draw(ctx);
          break;
        case "left":
          this.x = Math.max(
            gameBoard.minX + gameBoard.baseLimit,
            this.x - speed
          );
          this.draw(ctx);
          break;
        case "right":
          this.x = Math.min(
            gameBoard.maxX / 2 - gameBoard.baseLimit * 1.5,
            this.x + speed
          );
          this.draw(ctx);
          break;
        default:
          return null;
      }
    }
  }

  continousMove(ctx, speed) {
    this.y = Math.min(gameBoard.maxY - gameBoard.thresHold, this.y + speed);
    if (this.y >= gameBoard.maxY - gameBoard.thresHold) {
      this.placed = true;
    } else {
      this.draw(ctx);
    }
  }
}

export default RandomObject;
