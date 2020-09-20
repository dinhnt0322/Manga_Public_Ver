import Util from './Util';

const { scale } = Util;

const Styles = {
  color: {
    white: '#FFFFFF',
  },

  fontFamily: {
    roboto_bold: {
      fontFamily: 'Roboto_bold',
    },
    roboto_bold_italic: {
      fontFamily: 'Roboto_boldItalic',
    },
    roboto_italic: {
      fontFamily: 'Roboto_italic',
    },
    roboto_light: {
      fontFamily: 'Roboto_light',
    },
    roboto_light_italic: {
      fontFamily: 'Roboto_lightItalic',
    },
    roboto_medium: {
      fontFamily: 'Roboto_medium',
    },
    roboto_medium_italic: {
      fontFamily: 'Roboto_mediumItalic',
    },
    roboto: {
      fontFamily: 'Roboto',
    },
  },

  fontSize: {
    txt7: {
      fontSize: scale(7),
    },
    txt8: {
      fontSize: scale(8),
    },
    txt10: {
      fontSize: scale(10),
    },
    txt11: {
      fontSize: scale(11),
    },
    txt12: {
      fontSize: scale(12),
    },
    txt13: {
      fontSize: scale(13),
    },
    txt14: {
      fontSize: scale(14),
    },
    txt16: {
      fontSize: scale(16),
    },
    txt18: {
      fontSize: scale(18),
    },
    txt20: {
      fontSize: scale(20),
    },
    txt22: {
      fontSize: scale(22),
    },
    txt24: {
      fontSize: scale(24),
    },
    txt26: {
      fontSize: scale(26),
    },
    txt28: {
      fontSize: scale(28),
    },
    txt30: {
      fontSize: scale(30),
    },
    txt32: {
      fontSize: scale(32),
    },
    txt34: {
      fontSize: scale(34),
    },
    txt36: {
      fontSize: scale(36),
    },
    txt38: {
      fontSize: scale(38),
    },
    txt40: {
      fontSize: scale(40),
    },
    txt42: {
      fontSize: scale(42),
    },
    txt44: {
      fontSize: scale(44),
    },
    txt46: {
      fontSize: scale(46),
    },
    txt48: {
      fontSize: scale(48),
    },
    txt50: {
      fontSize: scale(50),
    },
    txt60: {
      fontSize: scale(60),
    },
    txt82: {
      fontSize: scale(82),
    },
  },

  viewStyle: {
    row: {
      flexDirection: 'row',
    },

    column: {
      flexDirection: 'column',
    },

    justify_center: {
      justifyContent: 'center',
    },

    align_center: {
      alignItems: 'center',
    },

    space_between: {
      justifyContent: 'space-between',
    },

    space_around: {
      justifyContent: 'space-around',
    },

    justify_start: {
      justifyContent: 'flex-start',
    },

    justify_end: {
      justifyContent: 'flex-end',
    },

    align_start: {
      alignItems: 'flex-start',
    },

    align_end: {
      alignItems: 'flex-end',
    },

    align_stretch: {
      alignItems: 'stretch',
    },

    wrap: {
      flexWrap: 'wrap',
    },
  },
};

export default Styles;
