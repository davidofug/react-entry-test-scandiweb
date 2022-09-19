import { createGlobalStyle } from 'styled-components';
import {COLORS,FONTS} from './constants'

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

  body {
    min-height:0;
    background:${COLORS.BACKGROUND.GRAY};
    color:${COLORS.BLACK};
    font-family:${FONTS.FAMILIES.RALEWAY} 'Sans-Serif';
  }
`;
 
export default GlobalStyle;