import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'native-base';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import { useDispatch } from 'react-redux';
import * as commonActions from '@ReduxSaga/actions/CommonActions';
import CImage from '@Common/CImage';
import useSelectData from '@Common/SelectData';
const { scale, getStatusBarHeight, screenSize, getHeaderBarHeight, isDark } = Util;

const { fontSize, viewStyle } = StylesCommon;

const WIDTH_SCREEN = screenSize().width;
const HEIGHT_HEADER = getHeaderBarHeight();
const HEIGHT_STATUS_BAR = getStatusBarHeight();

const Header = React.memo(() => {
  const { HeaderData } = useSelectData();
  const { surfaceColor, logo, textColor } = HeaderData();
  const dispath = useDispatch();
  const _onSwitchTheme = useCallback(() => {
    const { updateTheme } = commonActions;
    dispath(updateTheme());
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: surfaceColor, shadowColor: textColor }]}>
      <View style={{ width: WIDTH_SCREEN, minHeight: HEIGHT_STATUS_BAR }}>
        <StatusBar barStyle={isDark(textColor) ? 'dark-content' : 'light-content'} />
      </View>

      <View style={[styles.header]}>
        <View
          style={{
            ...viewStyle.row,
            ...viewStyle.align_center,
            ...viewStyle.space_between,
            width: '100%',
          }}>
          <TouchableOpacity onPress={_onSwitchTheme}>
            <Icon
              type="Feather"
              name={isDark(textColor) ? 'moon' : 'sun'}
              style={[styles.icon, { color: textColor }]}
            />
          </TouchableOpacity>

          {!!logo && (
            <CImage
              key={logo}
              source={{ uri: logo }}
              width={scale(150)}
              height={scale(24)}
              resizeMode={'contain'}
            />
          )}

          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => {}}>
            <Icon type="MaterialIcons" name="search" style={[styles.icon, { color: textColor }]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
  },
  logo: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...viewStyle.align_center,
    ...viewStyle.justify_center,
    flex: 1,
    width: scale(150),
    height: scale(24),
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
