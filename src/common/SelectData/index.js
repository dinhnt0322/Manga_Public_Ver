import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useCallback } from 'react';
import _ from 'lodash';
import headerData from './HeaderData';
import footerData from './FooterData';
import titleData from './TitleBarData';
import contentData from './ContentData';

const useSelectData = () => {
  const themeColor = useSelector(state => state.common.theme);

  return useMemo(() => {
    return {
      HeaderData: data => {
        return headerData(_.get(themeColor, 'value', {}), data);
      },
      ContentData: data => {
        return contentData(_.get(themeColor, 'value', {}), data);
      },
      ColorData: themeColor.value,
    };
  }, [themeColor]);
};

export default useSelectData;

//useMemo(()=>1,[])===useCallback(()=>{},[])
