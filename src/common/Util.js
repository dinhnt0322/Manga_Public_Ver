import {Dimensions, Platform, StatusBar} from 'react-native';
import _ from 'lodash';
import chroma from 'chroma-js';

const getWindowSize = () => {
  return Dimensions.get('window');
};

const WIDTH_DESIGN = 375;
const SCALE_NUMBER = getWindowSize().width / WIDTH_DESIGN;

const Util = {
  screenSize() {
    return getWindowSize();
  },

  isDark(color) {
    const rgb = chroma(color).rgb();
    const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return yiq < 128;
  },

  getSizeImage(w) {
    if (w < 320) {
      return 320;
    }

    if (w < 480) {
      return 480;
    }

    if (w < 640) {
      return 640;
    }

    if (w < 800) {
      return 800;
    }

    return 960;
  },

  scale(value) {
    return value * SCALE_NUMBER;
  },

  formatNumber(number) {
    if (typeof number === 'string') {
      number = parseFloat(number);
    }
    if (!number) return '0';
    let n = parseFloat(number.toFixed(2));
    return n.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
  },

  getStatusBarHeight(skipAndroid) {
    return Platform.select({
      ios: Util.isIphoneX() ? 44 : 20,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
      default: 0,
    });
  },

  isIphoneX() {
    const {width, height} = Util.screenSize();
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812 || height === 896 || width === 896)
    );
  },

  getToolbarHeight() {
    return Platform.select({
      ios: 64,
      android: 56,
      default: 0,
    });
  },

  getOrientation() {
    return 'portrait';
  },

  getBottomBarHeight() {
    let value = Platform.select({
      ios: 54,
      android: 54,
      default: 54,
    });
    return Util.scale(value);
  },

  getHeaderBarHeight() {
    let value = Platform.select({
      ios: 44,
      android: 56,
      default: 64,
    });
    return Util.scale(value);
  },

  getSafeArea(orientation) {
    // iPhoneX SafeArea
    const inSet = {
      portrait: {
        topInset: 24,
        leftInset: 0,
        rightInset: 0,
        bottomInset: 34,
      },
      landscape: {
        topInset: 0,
        leftInset: 44,
        rightInset: 44,
        bottomInset: 21,
      },
    };
    if (Platform.OS === 'ios' && Util.isIphoneX() && inSet[orientation]) {
      return inSet[orientation];
    }
    return {
      topInset: 0,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 0,
    };
  },
};

export default Util;
