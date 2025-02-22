// COLORS

const COLOR_GREEN = {
  100: '#fafcef',
  200: '#f3f7d9',
  300: '#e9f0bb',
  400: '#deea9b',
  500: '#d4e37d',
  600: '#cbdd61',
  700: '#adbc52',
  800: '#909d45',
  900: '#747e37',
  1000: '#5b632c',
};

const COLOR_PURPLE = {
  100: '#f6eff5',
  200: '#e8d9e7',
  300: '#d6bbd3',
  400: '#c39bbf',
  500: '#b17dab',
  600: '#a06199',
  700: '#885282',
  800: '#72456d',
  900: '#5b3757',
  1000: '#482c45',
};

const COLOR_RED = {
  100: '#fce7e7',
  200: '#f7c6c6',
  300: '#f19898',
  400: '#eb6868',
  500: '#e53b3b',
  600: '#df1010',
  700: '#be0e0e',
  800: '#9e0b0b',
  900: '#7f0909',
  1000: '#640707',
};


// FONTS
const FONTS = {
  Heading1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    letterSpacing: -1.5,
    color: COLOR_PURPLE[1000]


  },
  Heading2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    letterSpacing: -1.5,
    color: COLOR_PURPLE[1000]

  },
  Heading3: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    letterSpacing: -1.5,
    color: COLOR_PURPLE[1000]


  },
  Body: {
    fontFamily: 'Quicksand',
    fontSize: 18,
    color: COLOR_PURPLE[1000]
  }
}

export { COLOR_GREEN, COLOR_PURPLE, COLOR_RED, FONTS };
