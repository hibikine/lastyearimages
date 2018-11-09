import * as React from 'react';
import { TwitterPicker } from 'react-color';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import rmwoff2 from '../fonts/rounded-x-mplus-1p-bold.woff2';
import rmwoff from '../fonts/rounded-x-mplus-1p-bold.woff';
import rmeot from '../fonts/rounded-x-mplus-1p-bold.eot';
import rmttf from '../fonts/rounded-x-mplus-1p-bold.ttf';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
@font-face {
  font-family: 'Rounded M+ 1p Bold';
  font-style: bold;
  font-weight: 700;
  src: local('Rounded M+ 1p Bold'),
  url(${rmwoff2}) format("woff2"),
  url(${rmwoff}) format("woff"),
  url(${rmeot}) format("embedded-opentype"),
  url(${rmttf}) format("ttf");
}
`;

const Div = styled('div')`
  font-family: 'Rounded M+ 1p Bold';
`;

const App = () => (
  <div>
    <TwitterPicker />
    <Div>開発中!</Div>
  </div>
);
export default App;
