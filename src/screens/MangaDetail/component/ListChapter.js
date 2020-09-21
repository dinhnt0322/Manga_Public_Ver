import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import moment from 'moment';
import useSelectData from '@Common/SelectData';
const { fontSize, viewStyle } = StylesCommon;
const { screenSize, scale } = Util;

const listChapter = [];
listChapter[34] = 'value';
_.fill(listChapter, 'value', 0, 25);
const DetailManga = React.memo(({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listChapter.map((item, index) => {
          return <Item item={item} index={index} key={index} />;
        })}
      </ScrollView>
    </View>
  );
});

const Item = React.memo(({ item, index }) => {
  const { ColorData } = useSelectData();
  return (
    <TouchableOpacity
      key={index}
      style={{
        borderBottomColor: ColorData.desColor,
        borderBottomWidth: 1,
        paddingVertical: scale(10),
        paddingHorizontal: scale(16),
      }}>
      <Text style={[fontSize.txt14, { color: ColorData.textColor }]}>
        {index + 1}. Chapter {index + 1}
      </Text>
      <Text
        style={{
          ...fontSize.txt10,
          paddingTop: scale(10),
          color: ColorData.textColor,
        }}>
        {moment.utc(moment()).format('DD/MM/YYYY')}
      </Text>
    </TouchableOpacity>
  );
});

export default DetailManga;
