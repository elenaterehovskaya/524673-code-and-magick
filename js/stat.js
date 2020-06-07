'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;

var INDENT_TOP = 15;
var INDENT_BOTTOM = 10;
var INDENT_LEFT = 40;

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var TEXT_HEIGHT = 20;
var TEXT_GAP = 10;

var BAR_COLORS = ['hsl(240, 100%, 80%)', 'hsl(240, 100%, 75%)', 'hsl(240, 100%, 60%)', 'hsl(240, 100%, 45%)', 'hsl(240, 100%, 30%)', 'hsl(240, 100%, 15%)'];
/**
 * Получает максимальное значение в массиве
 * @param {Array} arrayElements массив для поиска
 * @return {number} maxElement максимальное значение
 */
var getMaxElement = function (arrayElements) {
  var currentIndex = 0;
  var maxElement = arrayElements[currentIndex];

  for (var i = currentIndex + 1; i < arrayElements.length; i++) {
    if (arrayElements[i] > maxElement) {
      maxElement = arrayElements[i];
    }
  }

  return maxElement;
};

/**
 * Получает случайное значение из массива
 * @param {Array} array массив с данными
 * @return {*} случайное значение из массива
 */
var getRandomItem = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

/**
 * Отрисовывает облако для вывода статистики
 * @param {Object} ctx контекст канваса, на котором рисуется игра
 * @param {number} x начальная точка облака по X
 * @param {number} y начальная точка облака по Y
 * @param {string} colorFill цвет заливки облака
 * @param {string} colorStroke цвет обводки облака
 */
var renderCloud = function (ctx, x, y, colorFill, colorStroke) {
  ctx.fillStyle = colorFill;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.strokeStyle = colorStroke;
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Отображает статистику прохождения уровня по времени
 * @param {Object} ctx контекст канваса, на котором рисуется игра
 * @param {Array} players массив с именами игроков, прошедших уровень
 * @param {Array} times массив с временем прохождения уровня, по длине совпадающий с массивом имён
 */
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1.0)', 'rgba(0, 0, 0, 0.7)');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + INDENT_LEFT, CLOUD_Y + INDENT_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + INDENT_LEFT, CLOUD_Y + INDENT_TOP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(Math.round(times[i]), CLOUD_X + INDENT_LEFT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - INDENT_BOTTOM - TEXT_HEIGHT * 2 - TEXT_GAP - (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillText(players[i], CLOUD_X + INDENT_LEFT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - INDENT_BOTTOM - TEXT_HEIGHT);
    ctx.fillStyle = getRandomItem(BAR_COLORS);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'hsl(355, 100%, 50%)';
    }
    ctx.fillRect(CLOUD_X + INDENT_LEFT + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - INDENT_BOTTOM - TEXT_HEIGHT - TEXT_GAP, BAR_WIDTH, (-BAR_HEIGHT * times[i]) / maxTime);
  }
};
