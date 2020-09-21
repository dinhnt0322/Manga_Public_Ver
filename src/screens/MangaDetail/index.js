import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import CImage from '@Common/CImage';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import useSelectData from '@Common/SelectData';
import DetailManga from './component/DetailManga';
import Header from './component/Header';
import ListChapter from './component/ListChapter';

const { fontSize, viewStyle } = StylesCommon;
const { screenSize, scale } = Util;
const WIDTH_SCREEN = screenSize().width;

const coverImageUrl = `https://saytruyen.com/app/manga/uploads/covers/`;
const dataDetail = {
  id: '4931f3bd8262b9b7b2e9d84f151ad696',
  uri: '4931f3bd8262b9b7b2e9d84f151ad696.jpg',
  title: 'Bố Tôi Quá Mạnh',
  genre: ['Action', 'Adventure', 'Supoermatural'],
  chapter: 24,
};

const TabBarRender = React.memo(props => {
  const { ColorData } = useSelectData();
  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: ColorData.mainColor,
        width: WIDTH_SCREEN / 2 - scale(80),
        marginHorizontal: scale(40),
      }}
      style={{ backgroundColor: ColorData.surfaceColor }}
      renderLabel={({ route, focused }) => {
        return (
          <Text
            style={{
              color: focused ? ColorData.mainColor : ColorData.textColor,
              ...fontSize.txt13,
              fontWeight: '500',
            }}>
            {route.title}
          </Text>
        );
      }}
    />
  );
});
const HomeScreen = React.memo(({ data = dataDetail }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Description', title: 'Thông tin' },
    { key: 'Chapter', title: 'Chapter' },
  ]);
  const { ColorData } = useSelectData();

  const renderTabBar = props => {
    return <TabBarRender {...props} />;
  };

  const renderScene = SceneMap({
    Description: DetailManga,
    Chapter: ListChapter,
  });

  const { uri, title, chapter, genre } = data;
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: ColorData.bgColor }}>
      <Header />
      <View>
        <CImage
          source={{ uri: coverImageUrl + uri }}
          resizeMode={'cover'}
          width={WIDTH_SCREEN}
          height={(WIDTH_SCREEN * 9) / 16}
        />
        <View
          style={{
            flex: 1,
            bottom: scale(10),
            left: scale(8),
            position: 'absolute',
          }}>
          <Text style={[fontSize.txt20, { color: '#FFF', fontWeight: '500' }]}>{title}</Text>
          <View style={viewStyle.row}>
            {genre.map(item => {
              return (
                <View key={item} style={[styles.label]}>
                  <Text style={[styles.textLabel, { color: '#FFF' }]}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: screenSize().width }}
        lazy
      />
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  label: {
    ...viewStyle.flex,
    ...viewStyle.column,
    marginTop: scale(16),
    borderRadius: scale(2),
    ...viewStyle.align_center,
    ...viewStyle.justify_end,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    marginHorizontal: scale(2),
    borderWidth: 0.5,
    borderColor: '#FFF',
  },
  textLabel: {
    ...fontSize.txt8,
    fontWeight: '500',
  },
  textDateTime: {
    ...fontSize.txt8,
    marginLeft: scale(8),
  },
  textTitle: {
    fontWeight: '500',
    ...fontSize.txt16,
    paddingRight: scale(5),
  },
  boxTitle: {
    marginLeft: scale(8),
    marginBottom: scale(10),
    marginTop: scale(4),
  },
});
