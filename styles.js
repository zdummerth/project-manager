import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const colors = {
  // brand: '#C00A0A',
  brand: '#6FFFB0',
  gradient: `linear-gradient(to bottom right, #020202, #C00A0A 25%, #020202)`,
}

export const theme1 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #020202, ${colors.brand} 45%, #020202)`,
    rgradient: `linear-gradient(to bottom right, ${colors.brand}, #020202 40%, #020202 60%,  ${colors.brand})`,
    text: 'white',
    error: '#C00A0A',
    background: 'black',
    // altBackground: '#222222',
    altBackground: `linear-gradient(to bottom right, #222222 , #303030, #222222)`,
    inputBackground: '#252525',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const theme2 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #fff, ${colors.brand} 45%, #fff)`,
    rgradient: `linear-gradient(to bottom right, ${colors.brand}, #fff 40%, #fff 60%,  ${colors.brand})`,
    text: 'black',
    error: '#C00A0A',
    background: '#e1e1e1',
    altBackground: '#b1b1b1',
    altBackground: `linear-gradient(to bottom right, #b1b1b1 , #d1d1d1, #b1b1b1)`,
    inputBackground: '#c3c3c3c3',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const theme3 = {
  colors: {
    brand: colors.brand,
    spacer: `radial-gradient(${colors.brand}, #000000)`,
    gradient: `linear-gradient(to bottom right, #020202, ${colors.brand} 45%, #020202)`,
    rgradient: `linear-gradient(to bottom right, #020202 40%, #020202 60%,  ${colors.brand})`,
    text: 'white',
    error: '#C00A0A',
    background: `black`,
    altBackground: `linear-gradient(to bottom right, ${colors.brand}, #101010, #101010, #222222, #101010, #101010, ${colors.brand})`,
    inputBackground: '#252525',
    gray: 'gray',
    darkgray: 'rgb(45,45,45)',
    lightblue: 'rgb(164,232,242)',
    button: {
      background: 'rgb(0, 128, 96)',
      remove: '#C00A0A',
      cancel: 'transparent',
      color: 'white',
      disabled: 'rgba(0,0,0,.6)'
    },
    input: {
      background: '#202020',
    }
  }
}

export const breakpoints = {
  mobile: '400px',
  phablet: '550px',
  tablet: '750px',
  desktop: '1000px',
  hd: '1300px'
};

export const dimensions = {
  navHeight: '60px',
};

export const spacing = {
  sm: '5px',
  md: '10px',
  lg: '15px',
  xl: '20px',
};

export const Spacer = styled.div`
  background: ${({ theme }) => theme.colors.spacer};
  height: 8px;
  margin: 8px 0;
  width: 100%;
`

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`


export const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    overflow-y: ${({ open }) => open ? 'hidden' : 'visible'};
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;

  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: Cinzel, 'Playfair Display SC', serif;
    margin: 0;
  }

  main { width: 100%; }

  .absolute { position: absolute; }

  .bg { background: ${({ theme }) => theme.colors.background}; }
  .alt-bg { background: ${({ theme }) => theme.colors.altBackground}; }
  .brand-bg { background: ${({ theme }) => theme.colors.brand}; }

  .std-div {
    border-radius: 10px;
    padding: 10px;
  }

  .b-rad-s { border-radius: 10px; }

  .alt-div-1 {
    border-radius: 30px;
    padding: 10px;
  }

  .w-100 { width: 100%; }
  .w-50 { width: 50%; }
  .h-75px { height: 75px; }
  .h-200px { height: 200px; }
  .h-40px { height: 40px; }

  .m-xxs { margin: 2.5px; }
  .m-xs { margin: 5px; }
  .m-s { margin: 10px; }
  .m-m { margin: 15px; }
  .m-l { margin: 25px; }

  .mb-xs { margin-bottom: 5px; }
  .mb-s { margin-bottom: 10px; }
  .mb-m { margin-bottom: 15px; }
  .mb-l { margin-bottom: 25px; }

  .ml-xs { margin-left: 5px; }
  .ml-s { margin-left: 10px; }
  .ml-m { margin-left: 15px; }
  .ml-l { margin-left: 25px; }

  .mt-xs { margin-top: 5px; }
  .mt-s { margin-top: 10px; }
  .mt-m { margin-top: 15px; }
  .mt-l { margin-top: 25px; }

  .mr-xs { margin-right: 5px; }
  .mr-s { margin-right: 10px; }
  .mr-m { margin-right: 15px; }
  .mr-l { margin-right: 25px; }


  .mtb-s {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mtb-m {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .mtb-l {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .ptb-s {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .product-card {
    width: 100%;
    max-width: 370px;
    // min-width: 200px;
    // height: 100%;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex { display: flex; }
  .flex-col {
    display: flex;
    flex-direction: column
  }

  .flex-1 {
    flex: 1;
  }

  .f-wrap { flex-wrap: wrap; }
  .fd-col { flex-direction: column }
  .fai-fs { align-items: flex-start; }
  .fai-fe { align-items: flex-end; }
  .fai-s { align-items: stretch; }
  .fai-c { align-items: center; }
  .fas-b { align-self: baseline; }
  .fas-fe { align-self: flex-end; }
  .fjc-c { justify-content: center; }
  .fjc-sb { justify-content: space-between; }
  .fjc-sa { justify-content: space-around; }
  .fjc-se { justify-content: space-evenly; }
  .fjc-fe { justify-content: flex-end; }
  .fjc-fs { justify-content: flex-start; }

  .ta-center {
    text-align: center;
  }

  .b-none {
    border: none;
  }

  .block {
    display: block;
  }

  .error {
    color: red;
    font-size: 14px;
  }

  .delete {
    background: red;
    color: white;
    // text-shadow: 1px 1px #000;
  }

  .active { border: 1px solid ${({ theme }) => theme.colors.brand}; }

  .c-brand { color: ${({ theme }) => theme.colors.brand}; }
  .c-text { color: ${({ theme }) => theme.colors.text}; }
  .c-delete { color: red; }

  .border { border: 1px solid gray; }

  .rotate { animation: ${rotate360} 1s linear infinite; }

  .cta {
    background: ${({ theme }) => theme.colors.brand};
    color: black;
  }

  .pop-up {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    // height: 300px;
    box-shadow: 0 0 5px 2px ${({ theme }) => theme.colors.text};
  }

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    // display: block;
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
  }

  input, textarea {
    border-radius: 10px;
    border: none;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.input.background};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.brand};
      outline: none;
    }
  }
`






