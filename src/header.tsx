import * as React from 'react';
import styled from 'react-emotion';
import roundedMplusBold from './rounded-mplus';

const NavBar = styled('div')`
  color: #fafafa;
  height: 60px;
  width: 100vw;
  background-color: #555;
  display: flex;
  align-items: center;
`;
const LogoElement = styled('h1')`
  font-family: '${roundedMplusBold}';
  margin-left: 10px;
  font-size: 1.5em;
  &:link {
    color: #fafafa;
  }
  &:visited {
    color: #fafafa;
  }
`;
const LogoLink = styled('a')`
  color: #fafafa;
  &:hover {
    color: #f0f0f0;
    text-decoration: none;
  }
`;
const Logo = () => (
  <LogoLink href="https://hibikine.me/oekaki">
    <LogoElement>お絵かき1年録ジェネレーター</LogoElement>
  </LogoLink>
);
const Header = () => (
  <NavBar>
    <Logo />
  </NavBar>
);
export default Header;
