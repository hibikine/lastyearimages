import $ from 'jquery';

import { drawImageToCanvas, drawText } from './canvas';

const _URL = window.URL || window.webkitURL;

const formConfig = {
  previewFileType: 'image',
  showUpload: false,
  maxFileCount: 1,
  fileSingle: '',
  msgZoomTitle: '拡大する',
  msgZoomModalHeading: '詳細プレビュー',
  msgPlaceholder: '画像ファイル',
};

export function setYourName() {
  const name = $('#name-text').val();
  if (name !== '') {
    $('#your-name').html(name);
  }
}

export function initNameForm(ctx) {
  $('#name-text').keyup(() => {
    drawText(ctx);
  });
}

export function initSubmitForm(canvas) {
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
    gtag('event', 'submit');
  });
}

export function createUploadForm(ctx) {
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
    f.fileinput(formConfig);
    f.on('fileimageloaded', (event) => {
      if (typeof (event.currentTarget.files[0]) !== 'undefined') {
        const file = event.currentTarget.files[0];
        const img = new Image();
        img.onload = () => {
          drawImageToCanvas(ctx, file, img, v);
        };
        img.src = _URL.createObjectURL(file);
      }
    });
    return f;
  });
}
