import $ from 'jquery';
import 'bootstrap';
import 'bootstrap-fileinput';

import { calcX, calcY } from './utilities';
import '../index.scss';

const canvas = $('#canvas-1');
const headerHeight = 100;
const monthHeaderHeight = 50;
const lineWidth = 2;
const canvasImageWidth = canvas.get(0).width - lineWidth * 5;
const canvasImageHeight =
      canvas.get(0).height - headerHeight - monthHeaderHeight * 3 - lineWidth * 3;
const imgw = (canvasImageWidth / 4 | 0);
const imgh = (canvasImageHeight / 3 | 0);

const canvasBackground = '#6d6d6d';
const textColor = '#f7f7f7';
const titleBackground = '#f0f0f0';
const titleTextColor = '#494949';
const fontfamilies = "游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif";
const fontweight = 800;
const fontSizeMonth = 40;
const fontSizeTitle = 80;
const monthTextStyle = `${fontweight} ${fontSizeMonth}px ${fontfamilies}`;
const titleTextStyle = `${fontweight} ${fontSizeTitle}px ${fontfamilies}`;

const _URL = window.URL || window.webkitURL;


function calcBlockX(x) {
  return x * imgw + lineWidth + lineWidth * x;
}
function calcBlockY(y) {
  return y * imgh + headerHeight + y * lineWidth + monthHeaderHeight + monthHeaderHeight * y;
}

function drawText(ctx) {
  ctx.fillStyle = titleBackground;
  ctx.fillRect(0, 0, canvas.get(0).width, headerHeight);
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
    drawtext, canvas.get(0).width / 2, headerHeight - fontSizeTitle / 4,
    canvas.get(0).width,
  );
}


function initCanvas(ctx) {
  ctx.fillStyle = canvasBackground;
  ctx.fillRect(0, 0, canvas.get(0).width, canvas.get(0).height);
  ctx.fillStyle = textColor;
  ctx.font = monthTextStyle;
  ctx.textAlign = 'center';
  Array(12).fill(0).map((i, v) => {
    const x = calcX(v);
    const y = calcY(v);
    const xPos = lineWidth + imgw / 2 + (imgw + lineWidth) * x;
    const yPos =
          (headerHeight + monthHeaderHeight)
    + (imgh + lineWidth + monthHeaderHeight) * y
    - fontSizeMonth / 4;
    ctx.fillText(`${v + 1}月`, xPos, yPos);
    ctx.fillRect(calcBlockX(x), calcBlockY(y), imgw, imgh);
    return v;
  });
  drawText(ctx);
}

function setYourName() {
  const name = $('#name-text').val();
  if (name !== '') {
    $('#your-name').html(name);
  }
}

window.onload = () => {
  $('#page-2').hide();
  $('#page-3').hide();

  const ctx = canvas.get(0).getContext('2d');
  initCanvas(ctx);

  const form = $('#upload-form');
  Array(12).fill(0).map((i, v) => {
    const p = $('<p></p>');

    const inputId = `image-${v}`;
    const f = $(`<input id="${inputId}" type="file" />`);
    f.change = () => {};

    const l = $(`<label for="${inputId}">${v + 1}月</label>`);

    form.append(p);
    p.append(l);
    p.append(f);
    f.fileinput({
      previewFileType: 'image',
      showUpload: false,
      maxFileCount: 1,
      fileSingle: '',
      msgZoomTitle: '拡大する',
      msgZoomModalHeading: '詳細プレビュー',
      msgPlaceholder: '画像ファイル',
    });
    f.on('fileimageloaded', (event) => {
      if (typeof (event.currentTarget.files[0]) !== 'undefined') {
        const file = event.currentTarget.files[0];
        const img = new Image();
        img.onload = () => {
          const width = file.width = img.width;
          const height = file.height = img.height;
          const x = calcX(v);
          const y = calcY(v);
          const xPos = calcBlockX(x);
          const yPos = calcBlockY(y);
          if (width > height) {
            ctx.drawImage(
              img,
              (width - height) / 2 | 0,
              0,
              height,
              height,
              xPos,
              yPos,
              imgw,
              imgh,
            );
          } else {
            ctx.drawImage(
              img,
              0,
              (height - width) / 2 | 0,
              width,
              width,
              xPos,
              yPos,
              imgw,
              imgh,
            );
          }
        };
        img.src = _URL.createObjectURL(file);
      }
    });
    return f;
  });
  $('#next-1').click(() => {
    $('body, html').scrollTop(0);
    $('#page-1').hide();
    $('#page-2').show();
  });
  $('#next-2').click(() => {
    $('body, html').scrollTop(0);
    $('#page-2').hide();
    $('#page-3').show();
    $('#sample-image').get(0).src = canvas.get(0).toDataURL();
    setYourName();
  });
  $('#back-1').click(() => {
    $('#page-2').hide();
    $('#page-1').show();
  });
  $('#back-2').click(() => {
    $('#page-3').hide();
    $('#page-2').show();
  });
  $('#name-text').keyup(() => {
    drawText(ctx);
  });
  const submitForm = $('#submit-form');
  submitForm.submit(() => {
    submitForm.append($('<input>').attr({
      type: 'hidden',
      name: 'canvas',
      value: canvas.get(0).toDataURL('image/jpeg'),
    }));
    submitForm.append($('<input>').attr({
      type: 'hidden',
      name: 'name',
      value: $('#name-text').get(0).value,
    }));
  });
};
