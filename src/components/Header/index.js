import React from 'react';
import _ from 'lodash';

import skin01 from './Skin01';
import skin02 from './Skin02';

const SkinTemplate = {
  skin01,
  skin02,
};

const TitleBar = React.memo(({ skin, title }) => {
  let Template = SkinTemplate[skin] || SkinTemplate['skin01'];

  return <Template title={title} />;
});

export default TitleBar;
