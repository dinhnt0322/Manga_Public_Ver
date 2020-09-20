import React, { useCallback } from 'react';
import { StatusBar, ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import CImage from '@Common/CImage';
import useSelectData from '@Common/SelectData';

const { scale } = Util;
const { fontSize, viewStyle } = StylesCommon;
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
const HorizontalList = ({ data = defaultData }) => {
  const { ContentData } = useSelectData();
  return (
    <View style={{ height: scale(190), backgroundColor: 'transparent' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((item, index) => {
            return <Item data={ContentData(item)} key={item.id} topNum={index + 1} />;
          })}
      </ScrollView>
    </View>
  );
};

const Item = React.memo(({ data, topNum }) => {
  const { imageSrc, title, mainColor, textColor, surfaceColor } = data;
  return (
    <TouchableOpacity
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center',
      }}>
      <View
        style={{
          overflow: 'hidden',
          width: scale(200),
          height: scale(170),
          border: scale(8),
          marginRight: scale(8),
          borderRadius: scale(8),
          backgroundColor: surfaceColor,
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.65,
            }}>
            {!!imageSrc && (
              <CImage
                source={{ uri: imageSrc }}
                resizeMode={'cover'}
                resizeMethod={'resize'}
                style={{ flex: 1 }}
              />
            )}
            {!!topNum && (
              <View style={[styles.label, { backgroundColor: mainColor }]}>
                <Text style={[styles.textLabel, { color: '#FFF' }]}>{`Top ` + topNum}</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 0.35, paddingTop: scale(8) }}>
            {/* {!!dateTime && (
                  <Text numberOfLines={1} style={[styles.textDateTime, { color: textColor }]}>
                    {moment(createdAt).format('lll')}
                  </Text>
                )} */}
            {!!title && (
              <View style={styles.boxTitle}>
                <Text numberOfLines={6} style={[styles.textTitle, { color: textColor }]}>
                  {title}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default HorizontalList;

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
    position: 'absolute',
    borderRadius: scale(9),
    ...viewStyle.align_center,
    ...viewStyle.justify_end,
    bottom: scale(6),
    left: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
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
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...viewStyle.align_center,
    ...viewStyle.justify_center,
  },
});
