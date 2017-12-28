import {drawText} from './canvas';

export default function initColorPicker(ctx) {
  $('#color-picker').spectrum({
    showPaletteOnly: true,
    flat: true,
    showInput: true,
    showPalette: true,
    allowEmpty: true,
    palette: [
      [
        '#6d6d6d',
        '#d26f6f',
        '#b2a006',
        '#aebd00',
        '#8aae39',
        '#49a552',
      ],
      [
        '#55b094',
        '#4b93b4',
        '#6473c3',
        '#786ec3',
        '#a674bb',
        '#bf60ad',
      ]
    ],
    change: (selectedColor) => {
      if (selectedColor === null) {
        return;
      }
      drawText(ctx, selectedColor.toString());
    },
  });
}
