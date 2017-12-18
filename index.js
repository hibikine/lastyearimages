$ = require('jquery');
require('./index.scss');
require('bootstrap-fileinput');

function initCanvas(ctx) {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 800, 600);
}

window.onload = () => {
  $('#page-2').hide();
  $('#page-3').hide();

  const canvas = $('#canvas-1');
  const ctx = canvas.get(0).getContext('2d');
  initCanvas(ctx);

  const form = $('#upload-form');
  const files = Array(12).fill(0).map((i, v) => {
    const p = $('<p></p>');

    const inputId = `image-${v}`;
    const f = $(`<input id="${inputId}" type="file" />`);
    f.change = () => {};

    const l = $(`<label for="${inputId}">${v+1}月</label>`);

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
      msgPlaceholder: '画像ファイル'
    });
    f.on('fileimageloaded', (event) => {
      const x = v % 4;
      const y = Math.floor(v / 4);
      const imgw = canvas.width / 4;
      const imgh = canvas.height / 3;
      console.log(event);
      console.log(f);
    })
    return f;
  });
  $('#next-1').click(() => {
    $('body, html').scrollTop(0);
    $('#page-1').hide();
    $('#page-2').show();
    /*imgs.map((i, v) => {
      if (typeof(i) === undefined) {
        return;
      }
      const xPos = v%4;
      const yPos = Math.floor(v/4);
      const imgWidth = canvas.width / 4;
      const imgHeight = canvas.height / 3;
      ctx.drawImage(i, xPos * imgWidth, yPos * imgHeight, );
    });*/
  });
  $('#next-2').click(() => {
    $('body, html').scrollTop(0);
    $('#page-2').hide();
    $('#page-3').show();
  });
  $('#back-1').click(() => {
    $('#page-2').hide();
    $('#page-1').show();
  });
  $('#back-2').click(() => {
    $('#page-3').hide();
    $('#page-2').show();
  });
};
