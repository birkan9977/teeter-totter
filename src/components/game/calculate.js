import gameBoard from "./board";

const calculateMomentum = (placedObjects) => {
  //10/630 is pixel meter ratio, converting to kgm

  console.log(placedObjects);
  const right = placedObjects.find((item) => item.id === -999);
  console.log("right", right);

  const lineStart = gameBoard.minX + gameBoard.baseLimit;
  const rightMomentum =
    (((right.center.x - lineStart) / 2) * right.value * 10) / 630;
  console.log("rightMomentum", rightMomentum);

  const left = placedObjects.filter((item) => item.id > -1);
  console.log(left);
  const lineEnd = gameBoard.maxX - gameBoard.baseLimit;
  const lineCenter = (lineEnd - lineStart) / 2;
  const leftMomentum = left.reduce((acc, curVal) => {
    console.log("curVal", curVal);
    return acc + (curVal.value * (lineCenter - curVal.center.x) * 10) / 630;
  }, 0);

  console.log("leftMomentum", leftMomentum);
};

export default calculateMomentum;
