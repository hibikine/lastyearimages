import $ from 'jquery';
import { setYourName } from './form';

export function gtagPageMove(pageNo, moveType) {
  gtag('page', 'move', {
    page_no: pageNo,
    move_type: moveType,
  });
}

export default function initPages(canvas) {
  $('#page-2').hide();
  $('#page-3').hide();

  $('#next-1').click(() => {
    $('body, html').scrollTop(0);
    $('#page-1').hide();
    $('#page-2').show();
    gtagPageMove('1', 'next');
  });
  $('#next-2').click(() => {
    $('body, html').scrollTop(0);
    $('#page-2').hide();
    $('#page-3').show();
    $('#sample-image').get(0).src = canvas.get(0).toDataURL();
    setYourName();
    gtagPageMove('2', 'next');
  });
  $('#back-1').click(() => {
    $('#page-2').hide();
    $('#page-1').show();
    gtagPageMove('0', 'back');
  });
  $('#back-2').click(() => {
    $('#page-3').hide();
    $('#page-2').show();
    gtagPageMove('1', 'back');
  });
}
