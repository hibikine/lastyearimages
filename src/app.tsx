import * as React from 'react';
import { TwitterPicker } from 'react-color';
import styled, { injectGlobal } from 'react-emotion';
import reboot from 'styled-reboot';
import ImageView from './image-view';
import roundedMplusBold from './rounded-mplus';
import Header from './header';

const rebootCss = reboot({});
// eslint-disable-next-line
injectGlobal`
${rebootCss}
html, body {
  overflow: hidden;
}
`;
const Div = styled('div')``;
const Main = styled('main')`
  display: flex;
  flex-direction: row;
`;
const Right = styled('div')`
  max-height: 100vh;
`;
const Left = styled('div')``;

class App extends React.Component {
  state = { color: '#22194d' };
  render() {
    const { color } = this.state;
    return (
      <div>
        <Header />
        <Main>
          <Right>
            <ImageView displayName="Hibikine Kage" color={color} />
          </Right>
          <Left>
            <TwitterPicker
              onChange={c => this.setState({ color: c.hex })}
              triangle="hide"
            />
          </Left>
        </Main>
      </div>
    );
  }
}
export default App;
