import * as React from 'react';
import styled from 'react-emotion';

const Button = styled('a')`
  color: white;
  border-radius: 7px;
  display: inline-block;
  height: 50px;
  width: 190px;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
  background: #1da1f3;
  overflow: hidden;
  text-decoration: none;
  border: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;
const TwitterIcon = styled('i')`
  text-shadow: 2px 2px 0px #4287d6;
  font-size: 1.2em;
  margin-right: 7px;
`;
const LoginButton = () => (
  <Button href="auth.php">
    <TwitterIcon className="fab fa-twitter" />
    Twitterでログイン
  </Button>
);
export default LoginButton;
