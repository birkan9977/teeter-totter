import gameBoard from "./board";

const calculateMomentum = (placedObjects) => {
  //10/630 is pixel meter ratio, converting to kgm

  const right = placedObjects.find((item) => item.id === -999);

  const lineStart = gameBoard.minX + gameBoard.baseLimit;
  const rightMomentum =
    (((right.center.x - lineStart) / 2) * right.value * 10) / 630;

  const left = placedObjects.filter((item) => item.id > -1);
  const lineEnd = gameBoard.maxX - gameBoard.baseLimit;
  const lineCenter = (lineEnd - lineStart) / 2;
  const leftMomentum = left.reduce((acc, curVal) => {
    return acc + (curVal.value * (lineCenter - curVal.center.x) * 10) / 630;
  }, 0);

  const leftTotalWeight = left.reduce((acc, curVal) => {
    return acc + curVal.value;
  }, 0);
  let diffLeftPercentage = 0;
  if (leftMomentum !== 0) {
    diffLeftPercentage = ((leftMomentum - rightMomentum) / leftMomentum) * 100;
  }
  let diffRightPercentage = 0;
  if (rightMomentum) {
    diffRightPercentage =
      ((rightMomentum - leftMomentum) / rightMomentum) * 100;
  }
  //3 deg -25, 25 >>> %30
  //2 deg -30,30 >>> %20
  //1deg -35,35 translate %10
  //-1 deg -45,45
  //-2 deg -55,55
  //-3 deg -60,60

  const moment = {
    left: {
      momentum: leftMomentum,
      weight: leftTotalWeight,
      diffPercentage: diffLeftPercentage,
      slope: diffLeftPercentage / 10,
    },
    right: {
      momentum: rightMomentum,
      weight: right.value,
      diffPercentage: diffRightPercentage,
      slope: diffRightPercentage / 10,
    },
  };

  return moment;
};

export default calculateMomentum;
