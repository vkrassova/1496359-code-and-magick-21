'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 50;
const FONT_GAP = 15;
const TEXT_WIDTH = 50;
const BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_WIDTH - GAP + FONT_GAP;
const BAR_WIDTH = 40;
const MAX_HEIGHT = BAR_HEIGHT + GAP + GAP;

const COLORS = [
  `hsl(0, 100%, 50%)`,
  `hsl(240, 100%, 40%)`,
  `hsl(238, 4%, 50%)`,
  `hsl(238, 20%, 50%)`
];


let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + 10,
      CLOUD_Y + 10,
      `rgba(0, 0, 0, 0.5)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP - FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP - 10);
  ctx.font = `16 px PT Mono`;

  let maxTime = getMaxElement(times);
  names.sort();

  for (let i = 0; i < names.length; i++) {
    let sumColor = 0;
    sumColor += i;
    ctx.fillText(
        names[i],
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + 200
    );
    ctx.fillStyle = COLORS[sumColor];
    ctx.fillRect(
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + 180,
        BAR_WIDTH,
        -((BAR_HEIGHT * times[i]) / maxTime)
    );

    ctx.fillStyle = `#000`;
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        MAX_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime)
    );
  }
};
