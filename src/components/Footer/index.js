import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'native-base';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import Navigation from '@Service/NavigationService';
import useSelectData from '@Common/SelectData';
const { scale, getBottomBarHeight, getOrientation, getSafeArea, screenSize } = Util;

const bottomBarHeight = getBottomBarHeight();
const WIDTH_SCREEN = screenSize().width;
const { viewStyle } = StylesCommon;

const Footer = React.memo(({ colorData, activeName }) => {
  const { surfaceColor, textColor } = colorData;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: surfaceColor,
          shadowColor: textColor,
        },
      ]}>
      <View style={[viewStyle.row, viewStyle.align_end]}>
        <Item data={{ iconName: 'tag', iconType: 'Feather', ...colorData }} />
        <Item data={{ iconName: 'layers', iconType: 'Feather', ...colorData }} />
      </View>
      <SpecialItem data={colorData} isActive={activeName === 'HomeScreen'} name={'HomeScreen'} />
      <View style={[viewStyle.row, viewStyle.align_center]}>
        <Item data={{ iconName: 'clockcircleo', iconType: 'AntDesign', ...colorData }} />
        <Item data={{ iconName: 'user', iconType: 'AntDesign', ...colorData }} />
      </View>
    </View>
  );
});

const Item = React.memo(({ data, name, isActive }) => {
  const { iconName, iconType, textColor, mainColor } = data;
  const _onPress = useCallback(() => {
    if (name) {
      Navigation.navigate(name);
    }
  }, []);
  return (
    <TouchableOpacity
      style={[
        { width: WIDTH_SCREEN / 5, height: bottomBarHeight, paddingTop: scale(5) },
        viewStyle.justify_start,
        viewStyle.align_center,
      ]}
      onPress={_onPress}>
      <Icon
        type={iconType}
        name={iconName}
        style={[styles.icon, { color: isActive ? mainColor : textColor }]}
      />
    </TouchableOpacity>
  );
});

const SpecialItem = React.memo(({ data, name, isActive }) => {
  const { surfaceColor, textColor, mainColor } = data;
  const _onPress = useCallback(() => {
    Navigation.navigate(name);
  }, []);
  return (
    <TouchableOpacity
      style={[
        styles.specialSkinContainer,
        {
          backgroundColor: surfaceColor,
          borderColor: isActive ? mainColor : textColor,
        },
        viewStyle.align_center,
        viewStyle.justify_center,
      ]}
      onPress={_onPress}>
      <Icon
        type={'AntDesign'}
        name={'home'}
        style={[styles.icon, { color: isActive ? mainColor : textColor }]}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    height: bottomBarHeight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 100,
    ...viewStyle.space_between,
    ...viewStyle.align_center,
    ...viewStyle.row,
  },
  specialSkinContainer: {
    width: WIDTH_SCREEN / 7,
    height: WIDTH_SCREEN / 7,
    borderRadius: WIDTH_SCREEN / 14,
    top: -WIDTH_SCREEN / 20,
    borderWidth: scale(5),
    alignItems: 'center',
  },
  icon: {
    fontSize: scale(24),
    paddingHorizontal: scale(5),
    paddingTop: scale(2),
  },
});
export default Footer;
