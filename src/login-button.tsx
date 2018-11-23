import * as React from 'react';
import styled from 'react-emotion';
import { Button } from './Button';

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
