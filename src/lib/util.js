const cv = require('opencv4nodejs')

const drawRect = (image, rect, color, opts = { thickness: 2 }) =>
  image.drawRectangle(
    rect,
    color,
    opts.thickness,
    cv.LINE_8
  );

const drawBlueRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(255, 0, 0), opts);

const drawGreenRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(0, 255, 0), opts);

const drawRedRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(0, 0, 255), opts);

  module.exports = {
    drawRect,
    drawBlueRect,
    drawGreenRect,
    drawRedRect,
  }
