export const drawCircle = (ctx, x, y, radius, color) => {
  var circle = new Path2D();
  const center = { x: x + radius, y: y + radius };
  ctx.fillStyle = color;
  circle.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.fill(circle);
  return center;
};

export const drawRectangle = (ctx, x, y, width, height, color) => {
  const rectangle = new Path2D();
  rectangle.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill(rectangle);
  const center = { x: x + width / 2, y: y + height / 2 };
  return center;
};

export const drawTriangle = (ctx, x, y, height, color) => {
  ctx.fillStyle = color;
  //let height = side * Math.cos(Math.PI / 6);
  let side = height / Math.cos(Math.PI / 6);
  let baseY = y + height;
  let triangle = new Path2D(
    `M${x} ${baseY} h ${side} l ${-(side / 2)} ${-height} Z`
  );
  ctx.fill(triangle);
  const center = { x: x + side / 2, y: y + (height * 2) / 3 };
  return center;
};
