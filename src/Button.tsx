import styled from 'react-emotion';

export const Button = styled('a')`
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

export default Button;
