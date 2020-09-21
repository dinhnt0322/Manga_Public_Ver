import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CImage from '@Common/CImage';
import Util from '@Common/Util';
import StyleCommon from '@Common/Styles';
import NavigationService from '@Service/NavigationService';
const { scale, screenSize } = Util;
const { viewStyle } = StyleCommon;

const WIDTH = screenSize().width;
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
const Skin01 = React.memo(({ data = defaultData, onPress }) => {
  let carousel = null;
  let pagination = null;

  const sliderWidth = WIDTH;
  const itemWidth = scale(300);
  const sliderHeight = scale(170);

  const onPress = useCallback(() => {
    NavigationService.navigate('MangaDetailScreen');
  }, []);
  //Mix data
  if (data.length === 0) {
    return null;
  }

  return (
    <View style={[viewStyle.align_center, viewStyle.justify_end, { paddingVertical: scale(8) }]}>
      <Carousel
        ref={c => (carousel = c)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        loop
        autoplay
        autoplayInterval={3000}
        data={data}
        onSnapToItem={value => {
          pagination && pagination.setActiveSlide(value);
          if (value === 0 || value === data.length - 1) {
            carousel && carousel.snapToItem(value, false);
          }
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                { width: itemWidth, height: sliderHeight },
                viewStyle.align_center,
                viewStyle.justify_center,
              ]}
              onPress={onPress}>
              <CImage
                source={{ uri: coverImageUrl + item.uri }}
                resizeMode={'cover'}
                width={itemWidth}
                height={sliderHeight}
              />
            </TouchableOpacity>
          );
        }}
      />
      {/* <PaginationCustom
        ref={(p) => (pagination = p)}
        dataLength={dataImage.length}
      /> */}
    </View>
  );
});
class PaginationCustom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
  }
  setActiveSlide = index => {
    this.setState({ activeSlide: index });
  };
  render() {
    return (
      <Pagination
        dotsLength={this.props.dataLength}
        activeDotIndex={this.state.activeSlide}
        containerStyle={styles.containerPaginationStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }
}
const styles = StyleSheet.create({
  containerPaginationStyle: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
  },
  dotStyle: {
    width: scale(20),
    height: scale(4),
    borderRadius: scale(21),
    backgroundColor: '#8C8C8C',
    marginHorizontal: scale(-4),
  },
  inactiveDotStyle: {
    width: scale(12),
    height: scale(4),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(21),
  },
});
export default Skin01;
