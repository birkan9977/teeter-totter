export const random = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const idIndex = (function () {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();
