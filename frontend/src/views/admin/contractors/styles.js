import styled from 'styled-components';
import theme from '../../../theme';

export const Switch = styled.div`
    display: flex;
    width: 50px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.borderRadius || "0"};
    border-style: solid;
    border-width: ${props => props.borderWidth || "0"};
    border-color: ${props => props.borderColor || "black"};
    color: ${theme.colors.black}
    font-size: 12px;
    cursor: pointer;
`;
