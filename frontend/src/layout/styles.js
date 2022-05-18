import styled from 'styled-components';
import theme from '../theme';

export const ExternalAddress = styled.a`
  color: ${theme.colors.white};;
  font-weight: bold;
  cursor: pointer;
  display: block;
  text-align: center;
  margin-right: 20px;
  color: ${theme.colors.footer} !important;
  
  &:hover {
    color: ${theme.colors.footer} !important;
  }
`
