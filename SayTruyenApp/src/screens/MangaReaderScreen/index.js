import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';
import MangaReader from '@Component/MangaReader';
import Header from './component/Header';
const HomeScreen = React.memo(() => {
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}>
      <Header />
      <MangaReader />
    </View>
  );
});

export default HomeScreen;
