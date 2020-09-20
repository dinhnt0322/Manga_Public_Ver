import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import NavigationService from '@Service/NavigationService';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { scale, getStatusBarHeight, screenSize, getHeaderBarHeight, isDark } = Util;
const { fontSize, viewStyle } = StylesCommon;

const WIDTH_SCREEN = screenSize().width;
const HEIGHT_HEADER = getHeaderBarHeight();
const HEIGHT_STATUS_BAR = getStatusBarHeight();

const Header = React.memo(({ data = {} }) => {
  const { bgColor = 'transparent', textColor = '#FFF' } = data;

  const onPress = useCallback(() => {
    NavigationService.goBack();
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={{ width: WIDTH_SCREEN, minHeight: HEIGHT_STATUS_BAR }}>
        <StatusBar barStyle={isDark(textColor) ? 'dark-content' : 'light-content'} />
      </View>

      <TouchableOpacity style={[styles.header]} onPress={onPress}>
        <View
          style={{
            ...viewStyle.row,
            ...viewStyle.align_center,
            ...viewStyle.space_between,
            width: '100%',
          }}>
          <Icon type="Ionicons" name="ios-arrow-back" style={[styles.icon, { color: textColor }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: 'absolute',
    zIndex: 10,
  },
  header: {
    paddingHorizontal: scale(16),
    ...viewStyle.align_center,
    ...viewStyle.space_between,
    ...viewStyle.row,
    width: WIDTH_SCREEN,
    height: HEIGHT_HEADER,
  },
  title: {
    ...fontSize.txt20,
  },
  description: {
    ...fontSize.txt14,
  },
  icon: {
    fontSize: scale(24),
    paddingHorizontal: scale(5),
    paddingTop: scale(2),
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...viewStyle.align_center,
    ...viewStyle.justify_center,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 5,
    right: 5,
  },
  gradientContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});
