import _ from 'lodash';
const HeaderData = (themeColor, data) => {
  return {
    ...themeColor,
    title: _.get(data, 'title', ''),
  };
};

export default HeaderData;
