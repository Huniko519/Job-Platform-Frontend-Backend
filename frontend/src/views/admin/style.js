import styled from 'styled-components';
import theme from '../../theme';

export const WidgetAmount = styled.span`
    font-size: 34px;
    background: linear-gradient(90deg, #3CA4E6 0%, #3C71DA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const WidgetItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    border: 1px solid ${theme.colors.primary};
    background-color: ${theme.colors.white};;
    width: 32%;
    border-radius: 6px;
    margin: 10px 0;
`;

export const Widgets = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 0;
`;
