import { injectGlobal } from 'emotion';
import { load } from 'webfontloader';
import rmwoff2 from '../fonts/rounded-x-mplus-1p-bold.woff2';
import rmwoff from '../fonts/rounded-x-mplus-1p-bold.woff';
import rmeot from '../fonts/rounded-x-mplus-1p-bold.eot';
import rmttf from '../fonts/rounded-x-mplus-1p-bold.ttf';

const roundedMplusBold = 'RoundedMplus1pBold';
export const withoutFontFace =
  'ヒラギノ丸ゴ Pro W4,ヒラギノ丸ゴ Pro,Hiragino Maru Gothic Pro,ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,HG丸ｺﾞｼｯｸM-PRO,HGMaruGothicMPRO,sans-serif';
export const fontFace = `${roundedMplusBold},${withoutFontFace}`;

let loaded = false;
let failed = false;
export const isLoaded = () => loaded;
export const isFailed = () => failed;

export const onLoaded: ((loaded: boolean) => void)[] = [];

load({
  custom: {
    families: [roundedMplusBold],
  },
  active: () => {
    loaded = true;
    onLoaded.forEach(f => f(loaded));
  },
  inactive: () => {
    failed = true;
    onLoaded.forEach(f => f(loaded));
  },
});
// eslint-disable-next-line no-unused-expressions
injectGlobal`
@font-face {
  font-family: '${roundedMplusBold}';
  font-style: bold;
  font-weight: 700;
  src: local('Rounded M+ 1p'),
  url(${rmwoff2}) format("woff2"),
  url(${rmwoff}) format("woff"),
  url(${rmeot}) format("embedded-opentype"),
  url(${rmttf}) format("ttf");
}
`;

export default roundedMplusBold;
