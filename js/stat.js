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

const Font = {
  SIZE: '16px',
  FAMILY: `PT Mono`
};

const colorShodow = 'rgba(0, 0, 0, 0.5)';
const colorCloud = `#fff`;

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// const COLORS = [
//   `hsl(0, 100%, 50%)`,
//   `hsl(240, 100%, 40%)`,
//   `hsl(238, 4%, 50%)`,
//   `hsl(238, 20%, 50%)`
// ];


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
      colorShodow
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      colorCloud
  );

  ctx.fillStyle = `#000`;
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP - FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP - 10);
  

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    // let sumColor = 0;
    // sumColor += i;

    ctx.fillText(
        names[i],
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + 200
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      let random = getRandomNumber(1, 100);
      ctx.fillStyle = 'hsl(240, ' + random + '%, 50%)';
    }

    ctx.fillStyle = `#000`;
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        MAX_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime)
    );

    // ctx.fillStyle = COLORS[sumColor];
    ctx.fillRect(
        CLOUD_X + GAP - FONT_GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + 180,
        BAR_WIDTH,
        -((BAR_HEIGHT * times[i]) / maxTime)
    );
  }
};
