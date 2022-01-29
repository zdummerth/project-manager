import styled from 'styled-components'

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
    altBackground: '#181818',
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
    background: '#eee',
    altBackground: '#ddd',
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
    background: `linear-gradient(to bottom right, #020202 40%, #020202 75%,  ${colors.brand})`,
    altBackground: '#151515',
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

export const fontSizes = {
  icons: '28'
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







