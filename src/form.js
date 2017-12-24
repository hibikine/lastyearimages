import $ from 'jquery';
import 'lazyload';
import moment from 'moment';

import {
  drawImageToCanvas,
  drawText,
} from './canvas';
import isLogin from './login';

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
  const callbacks = Array(12).fill(0).map((i, v) => {
    const p = $('<p></p>');

    const inputId = `image-${v}`;
    const f = $(`<input id="${inputId}" type="file" />`);
    f.change = () => {};

    const l = $(`<label for="${inputId}">${v + 1}月</label>`);

    p.append(l);
    p.append(f);
    f.fileinput(formConfig);
    f.on('fileimageloaded', (event) => {
      if (typeof (event.currentTarget.files[0]) !== 'undefined') {
        const file = event.currentTarget.files[0];
        const img = new Image();
        img.crossOrigin = "use-credentials";
        img.onload = () => {
          drawImageToCanvas(ctx, file, img, v);
        };
        img.src = _URL.createObjectURL(file);
      }
    });

    // ログイン時はタブを出す
    if (isLogin()) {
      const allWrapper = $('<div></div>');
      const tabWrapper = $(`
<ul class="nav nav-tabs">
</ul>`);
      const selectTab = $(`<li class="nav-item">
</li>`);
      const selectTabLink = $(`<a href="#select-pane-${v}" class="nav-link bg-primary text-light active" data-toggle="tab">Twitterから選択</a>`);
      const uploadTab = $(`
<li class="nav-item">

</li>`);
      const uploadTabLink = $(`<a href="#upload-pane-${v}" class="nav-link bg-primary text-light" data-toggle="tab">アップロード</a>`);
      const contentWrapper = $(`
<div class="tab-content"></div>`);
      const selectPane = $(`<div id="select-pane-${v}" class="tab-pane active"></div>`);
      const selectPaneInner = $('<div class="select-pane-inner"></div>');
      const loading = $('<img width="64px" height="64px" src="./img/loading.gif" />');
      const uploadPane = $(`<div id="upload-pane-${v}" class="tab-pane"></div>`);
      contentWrapper.append(selectPane);
      selectPane.append(selectPaneInner);
      contentWrapper.append(uploadPane);
      tabWrapper.append(selectTab);
      tabWrapper.append(uploadTab);
      selectTab.append(selectTabLink);
      uploadTab.append(uploadTabLink);

      allWrapper.append(tabWrapper);
      allWrapper.append(contentWrapper);

      uploadPane.append(p);
      selectPaneInner.append(loading);

      form.append(allWrapper);

      // 毎月の画像を取って設定するコールバック
      return monthlyTweets => {
        loading.remove();
        if (monthlyTweets.length === 0) {
          console.log('no contents');
          // 画像が1つもない場合はタブをDisableにする
          selectTabLink.removeClass('active');
          selectTabLink.removeClass('bg-primary');
          selectTabLink.addClass('disabled');
          selectTabLink.addClass('bg-secondary');
          selectPane.removeClass('active')
          uploadPane.addClass('active')
          uploadPane.addClass('select-pane')
          uploadTabLink.addClass('active');
          return selectPaneInner;
        }
        selectPaneInner.append(monthlyTweets.map(image => {
          const btn = $(`
  <input type="image" src="${image}:thumb" />
        `);
        btn.click(() => {
          const imgComponent = new Image();
          imgComponent.onload = () => {
            drawImageToCanvas(ctx, null, imgComponent, v);
          };
          imgComponent.src = `${image}:small`;
          selectPaneInner.children('input').removeClass('image-button-active');
          btn.addClass('image-button-active');
          return false;
        });
        return btn;
      }));
      return selectPaneInner;
    };
    }
    form.append(p);
    return f;
  });

  if (isLogin()) {
    fetch('http://192.168.99.100/oekaki/get-user-images.php', {
        method: 'GET',
        credentials: 'include',
      })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((tweets) => {
            console.log(tweets);
            if (tweets.error !== 'true') {

              const thisYear = moment().subtract(335, 'dates').year();
              callbacks.map((f, v) => {
                const minDate = moment([thisYear, v, 1]).subtract(1, 'days');
                const maxDate = moment([thisYear, v + 1, 1]).endOf('day');
                return f(tweets.filter((tweet) => {
                  // 画像つきツイートのみ抽出
                  if (tweet.media === null) {
                    return false;
                  }
                  if (tweet.media[0].type !== 'photo') {
                    return false;
                  }

                  // 時間内のものだけ抽出
                  const createdAt = moment(tweet.created_at, 'ddd MMM D HH:mm:ss ZZ YYYY').startOf('day');
                  if (createdAt.isAfter(maxDate)) {
                    return false;
                  }
                  if (createdAt.isBefore(minDate)) {
                    return false;
                  }

                  return true;
                }).reduce((images, tweet) => {
                  Array.prototype.push.apply(
                    images,
                    tweet.media.map(media => media.media_url_https),
                  );
                  return images;
                }, []));
              });
              //lazyload();
            }
          });
        }
        return null;
      });
  }
}
