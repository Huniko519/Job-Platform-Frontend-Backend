import styled from 'styled-components';
// import theme from '../../theme';
import { isMobile } from '../../theme/util';

export const SidebarContainer = styled.div`
    width: 220px;
    float: left;
    ${isMobile(`
        width: 100%;
    `)}
`;

export const SidebarWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 65px);
    background: linear-gradient(180deg, #3CA4E6 8.2%, #3C71DA 100%);
`;
