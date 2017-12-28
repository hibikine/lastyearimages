import 'babel-polyfill';
import 'bootstrap';
import 'bootstrap-fileinput';

import {
  initCanvas,
} from './canvas';
import {
  createUploadForm,
  initNameForm,
  initSubmitForm,
} from './form';
import initPages from './pages';
import initColorPicker from './color-picker';

import '../index.scss';

window.onload = () => {
  const [canvas, ctx] = initCanvas();
  createUploadForm(ctx);
  initPages(canvas);
  initNameForm(ctx);
  initSubmitForm(canvas);
  initColorPicker(ctx);
};
