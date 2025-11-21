import { createGlobalStyle } from 'styled-components'

export const Colors = {
  white: '#f7f7f7ff',
  lightgray: '#d1d5d6',
  gray: '#989696ff',
  darkgray: '#5b5b5bff',
  green: '#6a8892',
  black: '#313131ff',
  darkerblack: '#111111ff'
}

export const Container = createGlobalStyle`
  padding: 0 1rem;
  `

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${Colors.lightgray};
    color: ${Colors.black};
  }
`
