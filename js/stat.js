'use strict';

const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_HEIGHT = 270;
const CLOUD_WIDTH = 420;
const CLOUD_GAP = 20;
const FONT_GAP = 10;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const TITLE_X = CLOUD_X + CLOUD_GAP;

const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`
};

const colorShodow = `rgba(0, 0, 0, 0.5)`;
const colorCloud = `#fff`;


const renderCloud = function (ctx) {
  ctx.fillStyle = colorShodow;
  ctx.fillRect(CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = colorCloud;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const textCloud = function (ctx, text, x, y) {
  ctx.fillStyle = `#000`;
  ctx.textBaseline = `hanging`;
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.fillText(text, x, y);
};

const getMaxElement = function (arr) {
  const maxElement = arr[0];

  for (let i = 1; i > arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);

  textCloud(
      ctx,
      `Ура вы победили!`,
      TITLE_X,
      CLOUD_Y + CLOUD_GAP
  );

  textCloud(
      ctx,
      `Список результатов:`,
      TITLE_X,
      CLOUD_Y + BAR_WIDTH
  );

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    const BAR_X = CLOUD_X + BAR_GAP + (CLOUD_X - FONT_GAP) * i;
    const BAR_SIZE = (-CLOUD_HEIGHT + BAR_HEIGHT + BAR_GAP + FONT_GAP) * times[i] / maxTime;

    // столбцы

    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, ` + Math.floor(Math.random() * 100) + `%, 50%)`;
    }

    ctx.fillRect(
        BAR_X,
        CLOUD_HEIGHT - CLOUD_GAP - FONT_GAP,
        BAR_WIDTH,
        BAR_SIZE
    );


    // Время игроков

    textCloud(
        ctx,
        Math.round(times[i]),
        BAR_X,
        BAR_SIZE + BAR_HEIGHT + BAR_GAP + CLOUD_GAP
    );

    // Имена игроков

    textCloud(
        ctx,
        names[i],
        BAR_X,
        CLOUD_HEIGHT - CLOUD_GAP
    );
  }
};
