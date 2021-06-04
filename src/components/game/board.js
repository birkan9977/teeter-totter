const width = 640;
const height = 480;
const border = 5;
const title = 60;

const gameBoard = {
  width: width,
  height: height,
  gameSizeX: width - 2 * border,
  gameSizeY: height - 2 * border - title,
  minX: border,
  minY: border + title,
  maxX: width - border,
  maxY: height - border,
  thresHold: 150,
  baseLimit: 20,
};
export default gameBoard;
