import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import _ from 'lodash';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '@Component/Header';
import Footer from '@Component/Footer';

import useSelectData from '@Common/SelectData';

import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { scale, screenSize } = Util;
const { fontSize, viewStyle } = StylesCommon;

const listTit = [
  { key: 'TRUYEN_FULL', name: 'Truyện Full' },
  { key: 'MANHWA', name: 'Manhwa' },
  { key: 'MANHUA', name: 'Manhua' },
  { key: 'MANGA', name: 'Manga' },
  { key: 'TRINH_THAM', name: 'Trinh thám' },
  { key: 'TRUYEN_MAU', name: 'Truyên màu' },
  { key: 'XUYEN_KHONG', name: 'Xuyên không' },
];

const MangaByTabScreen = React.memo(() => {
  const { ColorData } = useSelectData();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'TRUYEN_FULL', name: 'Truyện Full' },
    { key: 'MANHWA', name: 'Manhwa' },
    { key: 'MANHUA', name: 'Manhua' },
    { key: 'MANGA', name: 'Manga' },
    { key: 'TRINH_THAM', name: 'Trinh thám' },
    { key: 'TRUYEN_MAU', name: 'Truyên màu' },
    { key: 'XUYEN_KHONG', name: 'Xuyên không' },
  ]);

  const _renderTabBar = props => {
    return <TabBarCustom index={index} onPress={setIndex} data={props.navigationState.routes} />;
  };
  const _renderScene = ({ route }) => {
    let currentStatus = routes[index].key;
    switch (route.key) {
      case 'TRUYEN_FULL':
        return <ListMangaTab active={currentStatus === 'TRUYEN_FULL'} status={'TRUYEN_FULL'} />;
      case 'MANHWA':
        return <ListMangaTab active={currentStatus === 'MANHWA'} status={'MANHWA'} />;
      case 'MANHUA':
        return <ListMangaTab active={currentStatus === 'MANHUA'} status={'MANHUA'} />;
      case 'MANGA':
        return <ListMangaTab active={currentStatus === 'MANGA'} status={'MANGA'} />;
      case 'TRINH_THAM':
        return <ListMangaTab active={currentStatus === 'TRINH_THAM'} status={'TRINH_THAM'} />;
      case 'TRUYEN_MAU':
        return <ListMangaTab active={currentStatus === 'TRUYEN_MAU'} status={'TRUYEN_MAU'} />;
      case 'XUYEN_KHONG':
        return <ListMangaTab active={currentStatus === 'XUYEN_KHONG'} status={'XUYEN_KHONG'} />;
      default:
        return null;
    }
  };
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: ColorData?.bgColor }}>
      <Header skin={'skin02'} title={'Thể loại'} />
      <ScrollView style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={_renderScene}
          renderTabBar={_renderTabBar}
          initialLayout={{ width: screenSize().width }}
          lazy
          swipeEnabled={false}
        />
      </ScrollView>
      <Footer activeName={'MangaByTabScreen'} colorData={ColorData} />
    </View>
  );
});

const ListMangaTab = React.memo(({ status, active }) => {
  if (!active) {
    return null;
  }
  return (
    <View>
      <Text>{status}</Text>
    </View>
  );
});

const TabBarCustom = React.memo(({ index, onPress, data }) => {
  const { ColorData } = useSelectData();
  const { textColor, mainColor } = ColorData;

  return (
    <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
      {data.map((route, idx) => {
        return (
          <TouchableOpacity
            key={route.key}
            style={{
              paddingHorizontal: scale(10),
              paddingVertical: scale(5),
              borderRadius: scale(13),
              borderColor: index !== idx ? textColor : mainColor,
              borderWidth: 1,
              marginHorizontal: scale(10),
              marginVertical: scale(5),
            }}
            onPress={() => {
              onPress(idx);
            }}>
            <Text
              style={{
                ...fontSize.txt14,
                color: index !== idx ? textColor : mainColor,
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default MangaByTabScreen;
