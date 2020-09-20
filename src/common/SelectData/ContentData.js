import _ from 'lodash';
const coverImageUrl = `https://saytruyen.com/app/manga/uploads/covers/`;
const ContentData = (themeColor, data) => {
  const imageUri = _.get(data, 'uri', '');
  return {
    ...themeColor,
    title: _.get(data, 'title', ''),
    imageSrc: imageUri ? coverImageUrl + imageUri : '',
  };
};

export default ContentData;
