import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Util from '@Common/Util';
import StylesCommon from '@Common/Styles';
import CImage from '@Common/CImage';
import moment from 'moment';
import useSelectData from '@Common/SelectData';
const { fontSize, viewStyle } = StylesCommon;
const { screenSize, scale } = Util;
const WIDTH_SCREEN = screenSize().width;
const SEVER_LINK = 'https://saytruyen.com';
const defaultData = {
  avatarSrc: '/app/manga/uploads/group/avatar.png',
  authorName: 'Ice Bear Comic',
  dateTime: '2020-09-03T17:47:13+07:00',
  description:
    'Từ một người công chức bình thường, chẳng có tài cán gì, DoJoon trở lại với tư cách là một con Quỷ Thiên Đàng. Bây giờ, ước muốn lớn nhất của anh ta là sống một cuộc sống yên bình, lặng lẽ thay cho những ngày sống trong thế giới Murim đầy xung đột và đẫm máu. Hãy trở thành một người cha cho đến khi tôi tốt nghiệp - DoJoon đột nhiên có một đứa con gái từ trên trời rơi xuống',
};

const listComment = [
  {
    createdBy: { fullName: 'Nguyễn Thanh Định' },
    message: 'Truyen hay qua',
  },
  {
    createdBy: { fullName: 'Huynhnttd' },
    message: 'Đọc ở saytruyen mà cũng bị chửi ah?',
  },
  {
    createdBy: { fullName: 'Thương Lê' },
    message: 'Làm mờ thêm tí đi , khó nhìn quá',
  },
  {
    createdBy: { fullName: 'Quang Vinh' },
    message:
      'Giờ tôi đã hiểu lý do vì sao nhiều người ko thích đọc trên page nhóm. Rườm rà rắc rối mà còn 1 đống water mark',
  },
  {
    createdBy: { fullName: 'Nguyễn Lâm' },
    message:
      'Anh em cho hỏi tên truyện main bị kẹt dungeron ko thoát ra được sau đó tập ở trọng cho đến khi mạnh nhất ko ai biết cho xin tên với ạ',
  },
];

const DetailManga = React.memo(({ data = defaultData }) => {
  const { avatarSrc, authorName, dateTime, description } = data;

  const { ColorData } = useSelectData();
  return (
    <View style={{ flex: 1, padding: scale(16) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: ColorData.surfaceColor,
            overflow: 'hidden',
            marginBottom: scale(10),
            paddingBottom: scale(10),
            borderBottomWidth: 1,
            borderColor: ColorData.secondaryColor,
          }}>
          <View>
            {!avatarSrc && !authorName && !dateTime ? null : (
              <View
                style={{
                  ...viewStyle.row,
                  paddingHorizontal: scale(16),
                  paddingVertical: scale(14),
                }}>
                {avatarSrc ? (
                  <View
                    style={{
                      borderRadius: scale(30),
                      overflow: 'hidden',
                      width: scale(30),
                      height: scale(30),
                      marginRight: scale(16),
                    }}>
                    <CImage
                      width={scale(30)}
                      height={scale(30)}
                      source={{
                        uri: SEVER_LINK + avatarSrc,
                      }}
                    />
                  </View>
                ) : null}

                <View style={{ flex: 1 }}>
                  {!!authorName && (
                    <Text
                      style={{
                        ...fontSize.txt14,
                        color: ColorData.textColor,
                      }}>
                      {authorName}
                    </Text>
                  )}

                  {!!dateTime && (
                    <Text
                      style={{
                        ...fontSize.txt10,
                        color: ColorData.textColor,
                      }}>
                      {moment.utc(moment()).format('DD/MM/YYYY')}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <View>
              {!!description && (
                <Text
                  style={{
                    ...fontSize.txt15,
                    color: ColorData.textColor,
                    paddingHorizontal: scale(16),
                    marginBottom: scale(14),
                  }}>
                  {description}
                </Text>
              )}
            </View>
          </View>
        </View>
        {listComment.map((item, index) => {
          return <CommentItem data={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
});

const CommentItem = React.memo(({ data }) => {
  const { ColorData } = useSelectData();
  return (
    <View style={[styles.itemComment]}>
      <CImage
        source={{
          uri: _.get(data, 'createdBy.avatar', ''),
        }}
        width={scale(25)}
        height={scale(25)}
        style={styles.avatar}
      />
      <View style={[styles.contentComment, { backgroundColor: ColorData.surfaceColor }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.userName, { color: ColorData.textColor }]}>
            {_.get(data, 'createdBy.fullName', '')}
          </Text>
          <Text style={[styles.txtComment, { color: ColorData.desColor }]}>
            {_.get(data, 'message', '')}
          </Text>
        </View>
      </View>
    </View>
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
