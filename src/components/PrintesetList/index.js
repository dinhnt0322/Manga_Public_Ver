import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import CImage from '@Common/CImage';
import StylesCommon from '@Common/Styles';
import Util from '@Common/Util';
import NavigationService from '@Service/NavigationService';
import useSelectData from '@Common/SelectData';
const { fontSize, viewStyle } = StylesCommon;
const { screenSize, scale } = Util;
const WIDTH_SCREEN = screenSize().width;
const coverImageUrl = `https://saytruyen.com/app/manga/uploads/covers/`;
const defaultData = [
  {
    id: '4931f3bd8262b9b7b2e9d84f151ad696',
    uri: '4931f3bd8262b9b7b2e9d84f151ad696.jpg',
    title: 'Bố Tôi Quá Mạnh',
    chapter: 24,
  },
  {
    id: 'billy-bat',
    uri: 'billy-bat.png',
    title: 'Billy Bat',
    chapter: 133,
  },
  {
    id: 'tren-nguoi-ta-co-mot-con-rong',
    uri: 'tren-nguoi-ta-co-mot-con-rong.png',
    title: 'Trên Người Ta Có Một Con Rồng',
    chapter: '236',
  },
  {
    id: 'ngan-thuan-ngan-ai-muoi',
    uri: 'ngan-thuan-ngan-ai-muoi.png',
    title: 'Ngận Thuần Ngận Ái Muội',
    chapter: '337',
  },
  {
    id: '0b07e925cfc0b9e9239ebc38878004db',
    uri: '0b07e925cfc0b9e9239ebc38878004db.png',
    title: 'Freaking Romance',
    chapter: '6',
  },
];
const PrintesetList = React.memo(({ data = defaultData }) => {
  const [listItem, setListItem] = useState([]);
  const [nowItemIndex, setNowItemIndex] = useState(0);
  useEffect(() => {
    setListItem(listItem => {
      let now = nowItemIndex;
      if (data[now]) {
        const item = data[now];
        const columnIndex = nowItemIndex % 2;
        const columnItem = listItem[columnIndex] || [];
        const result = [...listItem];
        result[columnIndex] = [...columnItem, item];
        return result;
      }
      return listItem;
    });
    setNowItemIndex(now => now + 1);
  }, [listItem]);
  return (
    <FlatList
      data={listItem}
      keyExtractor={(item, index) => {
        return 'COLUMN-' + index.toString() + '/'; // + (this.props.columns - 1);
      }}
      contentContainerStyle={{
        flexDirection: 'row',
        width: '100%',
      }}
      renderItem={({ item, index }) => {
        return <MasonryList item={item} colIndex={index} />;
      }}
    />
  );
});

const MasonryList = React.memo(({ colIndex, item }) => {
  const { ContentData } = useSelectData();
  return (
    <View
      style={{
        width: WIDTH_SCREEN / 2,
        paddingLeft: colIndex === 0 ? scale(8) : scale(4),
        paddingRight: colIndex === 0 ? scale(4) : scale(8),
      }}>
      <FlatList
        data={item}
        keyExtractor={(item, index) => {
          return 'IMAGE-CELL-' + index.toString() + '---' + colIndex;
        }}
        renderItem={({ item }) => {
          return <Item data={ContentData(item)} />;
        }}
      />
    </View>
  );
});

const Item = React.memo(({ data }) => {
  const onPress = useCallback(() => {
    NavigationService.navigate('MangaDetailScreen');
  }, []);
  const { textColor, title, imageSrc } = data;

  return (
    <TouchableOpacity style={{ flex: 1, paddingVertical: scale(10) }} onPress={onPress}>
      <CImage
        source={{ uri: imageSrc }}
        width={WIDTH_SCREEN / 2 - scale(12)}
        autoHeight
        defaultHeight={scale(270)}
        style={{ borderRadius: scale(10) }}
        key={imageSrc}
      />
      <Text
        style={{
          ...fontSize.txt14,
          color: textColor,
          marginVertical: scale(10),
          overflow: 'hidden',
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

export default PrintesetList;
