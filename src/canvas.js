import $ from 'jquery';
import {
  calcX,
  calcY,
} from './utilities';

const canvasBackground = '#6d6d6d';
const textColor = '#f7f7f7';
const titleBackground = '#f0f0f0';
const titleTextColor = '#494949';
const fontfamilies = "游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif";
const fontweight = 800;
const fontSizeMonth = 40;
const headerHeight = 140
const fontSizeTitle = headerHeight * 2 / 3;
;
const monthHeaderHeight = 50;
const lineWidth = 2;
const imgw = 300;
const imgh = 300;

const canvasWidth = imgw * 4 + lineWidth * 5;
const canvasHeight = imgh * 3 + headerHeight + monthHeaderHeight * 3 + lineWidth * 3;

const monthTextStyle = `${fontweight} ${fontSizeMonth}px ${fontfamilies}`; // `
const titleTextStyle = `${fontweight} ${fontSizeTitle}px ${fontfamilies}`;

export function calcBlockX(x) {
  return x * imgw + lineWidth + lineWidth * x;
}

export function calcBlockY(y) {
  return y * imgh + headerHeight + y * lineWidth + monthHeaderHeight + monthHeaderHeight * y;
}

export function drawText(ctx) {
  ctx.fillStyle = titleBackground;
  ctx.fillRect(0, 0, canvasWidth, headerHeight);
  ctx.fillStyle = titleTextColor;
  ctx.font = titleTextStyle;
  let drawtext = '';
  const name = $('#name-text').get(0).value;
  if (name !== '') {
    drawtext = `${name}のお絵かき1年録`;
  } else {
    drawtext = 'お絵かき1年録';
  }
  ctx.fillText(
    drawtext, canvasWidth / 2, headerHeight - fontSizeTitle / 3,
    canvasWidth,
  );
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
  ctx.fillStyle = canvasBackground;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = textColor;
  ctx.font = monthTextStyle;
  ctx.textAlign = 'center';
  Array(12).fill(0).map((i, v) => {
    const x = calcX(v);
    const y = calcY(v);
    const xPos = lineWidth + imgw / 2 + (imgw + lineWidth) * x;
    const yPos =
      (headerHeight + monthHeaderHeight) +
      (imgh + lineWidth + monthHeaderHeight) * y -
      fontSizeMonth / 4;
    ctx.fillText(`${v + 1}月`, xPos, yPos);
    ctx.fillRect(calcBlockX(x), calcBlockY(y), imgw, imgh);
    return v;
  });
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
      imgw,
      imgh,
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
      imgw,
      imgh,
    );
  }
}
