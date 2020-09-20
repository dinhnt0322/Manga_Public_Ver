import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import CImage from '@Common/CImage';
import Util from '@Common/Util';
const { screenSize, scale } = Util;
const WIDTH_SCREEN = screenSize().width;

const ImageUrl = 'https://saytruyen.com/';
const listImage = [
  'app/manga/uploads/manga/bo-toi-qua-manh/26/ZT4eaT1QU17jlC5t99I50000.jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/4n0YQ1B6Nm0oFqxi4jS8000.png',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/ef5qZrHmaMUtFZaQjF5Vimg_(1).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/2uyzSimZkpzGzmTPsAQHimg_(2).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/f1BloH1cAIc0RnhgfjqIimg_(3).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/jU9iDSNL5F4S2ilKtv6Rimg_(4).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/uTrdTOM1PeEKn0w2P3pcimg_(5).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/iNQQkUY7YnYDHASQDjQwimg_(6).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/Cp3EmGoXmWmKHfcCfJDoimg_(7).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/c8eYqFqVWqX52CzWRVYbimg_(8).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/hsY5TRUc53nSEtO3H2kHimg_(9).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/imU1ONIuy2tj4phjNXEjimg_(10).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/zNqARJwETSj9XaMeD8Wnimg_(11).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/XTiqsUCSzqAn9PeNpg56img_(12).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/zICcffhA3Nl2rgjapdYWimg_(13).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/spdOnSMF9LrPfUrvQqOFimg_(14).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/MmZtaJ2JNCBPLOg8eco1img_(15).jpg',
  'app/manga/uploads/manga/bo-toi-qua-manh/26/btkfmT0rruXxODLUG0mGimg_(16).jpg',
];

const MangaReader = ({ data = listImage }) => {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CImage
          source={{ uri: ImageUrl + item }}
          imageWidth={WIDTH_SCREEN}
          autoHeight
          isZoom
          loadCache
        />
      );
    },
    [listImage]
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
};

export default MangaReader;
