import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    
    background-color: #e5e5e5;
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
  }
`;
