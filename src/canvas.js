import $ from 'jquery';
import {
  calcX,
  calcY,
} from './utilities';
import tinycolor from 'tinycolor2';

const canvasBackground = '#6d6d6d';
const textColor = '#f7f7f7';
const titleBackground = '#f0f0f0';
const titleTextColor = '#494949';
const fontfamilies = "游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif";
const fontweight = 800;
const fontSizeMonth = 40;
const headerHeight = 140;
const fontSizeTitle = headerHeight * 2 / 3;
;
const monthHeaderHeight = 68;
const lineWidth = 7;
const imageWidth = 300;
const imageHeight = 300;

const canvasWidth = imageWidth * 4 + lineWidth * 5;
const canvasHeight = imageHeight  * 3 + headerHeight + monthHeaderHeight * 3 + lineWidth;

const monthTextFont = `${fontweight} ${fontSizeMonth}px ${fontfamilies}`; // `
const titleTextFont = `${fontweight} ${fontSizeTitle}px ${fontfamilies}`;

export function calcBlockX(x) {
  return x * imageWidth + lineWidth + lineWidth * x;
}

export function calcBlockY(y) {
  return y * imageHeight  + headerHeight + monthHeaderHeight + monthHeaderHeight * y;
}

let settedBackgroundColor = canvasBackground;
export function drawText(ctx, background){
  if (typeof(background) === 'undefined') {
    background = settedBackgroundColor;
  }

  // タイトル
  const titleTextColor = tinycolor(background).darken(15).toString();
  ctx.fillRect(0, 0, canvasWidth, headerHeight);
  ctx.fillStyle = titleTextColor;
  ctx.font = titleTextFont;
  let drawtext = '';
  const name = $('#name-text').get(0).value;
  if (name !== '') {
    drawtext = `${name}のお絵かき1年録`;
  } else {
    drawtext = 'お絵かき1年録';
  }
  ctx.textAlign = 'center';
  ctx.fillText(
    drawtext, canvasWidth / 2, headerHeight - fontSizeTitle / 3,
    canvasWidth,
  );

  // 縦線
  Array(5).fill(0).map((i, v) => {
    const x = (lineWidth + imageWidth) * v;
    ctx.fillStyle = background;
    ctx.fillRect(x, headerHeight, lineWidth, canvasHeight - headerHeight);
  });

  // 横線
  Array(4).fill(0).map((i, v) => {
    ctx.beginPath();
    const y = headerHeight + (monthHeaderHeight + imageHeight ) * v;
    const gradient = ctx.createLinearGradient(0, y, 0, y + monthHeaderHeight);
    gradient.addColorStop(0, background);
    gradient.addColorStop(1, tinycolor(background).darken(5).toString());
    ctx.fillStyle = gradient;
    ctx.rect(0, y, canvasWidth, monthHeaderHeight);
    ctx.fill();
  });

  // 文字
  Array(12).fill(0).map((i, v) => {
    const x = calcX(v);
    const y = calcY(v);
    const xPos = lineWidth + imageWidth / 2 + (imageWidth + lineWidth) * x;
    const yPos =
      (headerHeight + monthHeaderHeight) +
      (imageHeight + monthHeaderHeight) * y - 20;
    ctx.fillStyle = textColor;
    ctx.font = monthTextFont;
    ctx.fillText(`${v + 1}月`, xPos, yPos);
  });
}

export function initCanvas() {
  const canvas = $(`
  <canvas
  class="col-12 center-block"
  id="canvas-1"
  width="${canvasWidth}"
  height="${canvasHeight}"
  ></canvas>`);
  $('#canvas-wrapper').html(canvas);
  const ctx = canvas.get(0).getContext('2d');
  ctx.fillStyle = textColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  drawText(ctx);
  return [canvas, ctx];
}

export function drawImageToCanvas(ctx, file, img, month) {
  const x = calcX(month);
  const y = calcY(month);
  const xPos = calcBlockX(x);
  const yPos = calcBlockY(y);
  if (img.width > img.height) {
    ctx.drawImage(
      img,
      (img.width - img.height) / 2 | 0,
      0,
      img.height,
      img.height,
      xPos,
      yPos,
      imageWidth,
      imageHeight ,
    );
  } else {
    ctx.drawImage(
      img,
      0,
      (img.height - img.width) / 2 | 0,
      img.width,
      img.width,
      xPos,
      yPos,
      imageWidth,
      imageHeight ,
    );
  }
}
