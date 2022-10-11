import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import {theme} from './src/theme/theme';
export const GlobalStyle = createGlobalStyle`

    ${reset}
    body {
        background: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
        color: ${props => props.theme.PRIMARY_TEXT_COLOR};
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 1.5;
        margin: 0 auto;
        word-break: keep-all;
        word-wrap: break-word;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
`;
