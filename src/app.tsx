import * as React from 'react';
import { TwitterPicker } from 'react-color';
import rmwoff2 from '../fonts/rounded-x-mplus-1p-bold.woff2';
import rmwoff from '../fonts/rounded-x-mplus-1p-bold.woff';
import { injectGlobal } from 'emotion';

injectGlobal`
@font-face {
  font-family: 'Rounded M+ 1p Bold';
  font-style: bold;
  font-weight: 700;
  src: local('Rounded M+ 1p Bold'),
  url()
}
`;

const App = () => (
  <div>
    <TwitterPicker />
  </div>
);
export default App;
