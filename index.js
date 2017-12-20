$ = require('jquery');
require('./index.scss');
require('bootstrap');
require('bootstrap-fileinput');
const OAuth = require('oauth');

const OAuth2 = OAuth.OAuth2;
const _URL = window.URL || window.webkitURL;

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
      if (typeof (event.currentTarget.files[0]) !== 'undefined') {
        const file = event.currentTarget.files[0];
        const img = new Image();
        img.onload = () => {
          const width = file.width = img.width;
          const height = file.height = img.height;
          const x = v % 4;
          const y = v / 4 | 0;
          const imgw = canvas.get(0).width / 4 | 0;
          const imgh = canvas.get(0).height / 3 | 0;
          //ctx.drawImage(img, 0, 0);
          if (width > height) {
            ctx.drawImage(
              img,
              (width - height) / 2 | 0,
              0,
              height,
              height,
              x * imgw,
              y * imgh,
              imgw,
              imgh
            );
          } else {
            ctx.drawImage(
              img,
              0,
              (height - width) / 2 | 0,
              width,
              width,
              x * imgw,
              y * imgh,
              imgw,
              imgh
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
    const oauth2 = new OAuth2(
      '',
      '',
      'https://api.twitter.com/',
      null,
      'oauth2/token',
      null);
    oauth2.getOAuthAccessToken(
      '', {
        'grant_type': 'client_credentials'
      },
      (e, access_token, refresh_token, results) => {
        done();
      }
    );
  });
  $('#back-1').click(() => {
    $('#page-2').hide();
    $('#page-1').show();
  });
  $('#back-2').click(() => {
    $('#page-3').hide();
    $('#page-2').show();
  });
  const submitForm = $('#submit-form');
  submitForm.submit(() => {
    const image_uri = canvas.toDataURL("image/png");
  });
};
