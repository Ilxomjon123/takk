const primaryColors = require('@left4code/tw-starter/dist/js/colors');

module.exports = {
  // mode: 'jit',
  content: [
    './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './node_modules/@left4code/tw-starter/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: primaryColors.gray['300']
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
      large: '3.125rem'
    },
    colors: {
      ...primaryColors,
      white: 'white',
      black: 'black',
      current: 'current',
      transparent: 'transparent',
      theme: {
        1: '#1C3FAA',
        2: '#F1F5F8',
        3: '#2E51BB',
        4: '#274AB7',
        5: '#DEE7EF',
        6: '#D32929',
        7: '#365A74',
        8: '#D2DFEA',
        9: '#91C714',
        10: '#3160D8',
        11: '#F78B00',
        12: '#FBC500',
        13: '#7F9EB9',
        14: '#E6F3FF',
        15: '#8DA9BE',
        16: '#607F96',
        17: '#FFEFD9',
        18: '#D8F8BC',
        19: '#2449AF',
        20: '#395EC1',
        21: '#C6D4FD',
        22: '#E8EEFF',
        23: '#1A389F',
        24: '#163296',
        25: '#C7D2FF',
        26: '#15329A',
        27: '#203FAD',
        28: '#BBC8FD',
        29: '#284EB2',
        30: '#98AFF5',
        31: '#01E3C7',
        32: '#919191',
        33: '#E8F6F9',
        34: '#FBFEFF',
        35: '#2f2e41'
      }
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ['dark']
    }
  }
};
