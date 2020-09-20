import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';
import PrintesetList from '@Component/PrintesetList';
import SliderImage from '@Component/SliderImage';
import Header from '@Component/Header';
import Footer from '@Component/Footer';
import Title from '@Component/TitleBar';
import HorizontalList from '@src/components/HorizontalList';

import useSelectData from '@Common/SelectData';

const HomeScreen = React.memo(() => {
  const { ColorData } = useSelectData();
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: ColorData?.bgColor }}>
      <Header skin={'skin01'} />
      <ScrollView style={{ flex: 1 }}>
        <SliderImage />
        <Title title={'Truyện hot trong ngày'} colorData={ColorData} />
        <HorizontalList />
        <Title title={'Truyện hot mới cập nhật'} colorData={ColorData} />
        <PrintesetList />
      </ScrollView>
      <Footer activeName={'HomeScreen'} colorData={ColorData} />
    </View>
  );
});

export default HomeScreen;
