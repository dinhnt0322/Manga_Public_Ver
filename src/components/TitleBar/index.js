import React from 'react';
import { View, Text } from 'react-native';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import _ from 'lodash';
const { fontSize } = StylesCommon;
const { scale } = Util;

const Skin07 = React.memo(({ title, colorData }) => {
  const { textColor } = colorData;
  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginHorizontal: scale(8),
        marginVertical: scale(2),
      }}>
      <View style={[{ paddingVertical: scale(16) }, { paddingRight: scale(16) }]}>
        {title ? (
          <View
            style={{
              paddingLeft: scale(16),
              borderLeftWidth: scale(4),
              borderLeftColor: textColor,
            }}>
            <Text
              style={{
                color: textColor,
                textAlign: 'left',
                ...fontSize.txt24,
                fontWeight: '500',
              }}>
              {title}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
});

export default Skin07;
