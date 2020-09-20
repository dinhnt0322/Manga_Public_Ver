import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import CImage from '@Common/CImage';
import NavigateService from '@Service/NavigationService';
import moment from 'moment';
const { fontSize, viewStyle } = StylesCommon;
const { screenSize, scale } = Util;
const WIDTH_SCREEN = screenSize().width;
const SEVER_LINK = 'https://saytruyen.com';

const listChapter = [];
listChapter[34] = 'value';
_.fill(listChapter, 'value', 0, 25);
const DetailManga = React.memo(({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listChapter.map((item, index) => {
          return <Item item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
});

const Item = React.memo(({ item, index }) => {
  const onPress = useCallback(() => {
    NavigateService.push('MangaReaderScreen');
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      key={index}
      style={{
        borderBottomColor: '#F3F3F9',
        borderBottomWidth: 1,
        paddingVertical: scale(10),
        paddingHorizontal: scale(16),
      }}>
      <Text style={fontSize.txt14}>
        {index + 1}. Chapter {index + 1}
      </Text>
      <Text
        style={{
          ...fontSize.txt10,
          paddingTop: scale(10),
        }}>
        {moment.utc(moment()).format('DD/MM/YYYY')}
      </Text>
    </TouchableOpacity>
  );
});

export default DetailManga;

const styles = StyleSheet.create({
  itemComment: {
    ...viewStyle.row,
    ...viewStyle.align_center,
    ...viewStyle.justify_center,
    marginBottom: scale(15),
    flex: 1,
  },

  contentComment: {
    padding: scale(8),
    borderRadius: scale(10),
    backgroundColor: '#F3F3F9',
    flex: 1,
    ...viewStyle.row,
    ...viewStyle.space_between,
  },
  userName: {
    ...fontSize.txt12,
    fontWeight: '500',
    color: '#333333',
  },
  txtComment: {
    ...fontSize.txt12,
    color: '#4F4F4F',
  },
  avatar: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(14),
    marginRight: scale(5),
  },
  inputContainer: {
    flex: 1,
    ...fontSize.txt12,
    width: '100%',
    borderRadius: scale(5),
    padding: scale(5),
  },
  editButton: {
    height: scale(25),
    width: scale(60),
    borderRadius: scale(3),
    ...viewStyle.align_center,
    ...viewStyle.justify_center,
  },
  editContainer: {
    ...viewStyle.align_end,
    ...viewStyle.justify_end,
    height: scale(170),
    flex: 1,
    marginTop: scale(5),
  },
});
