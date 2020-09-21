import React from 'react';

import { ActivityIndicator, Image, Platform } from 'react-native';

import _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import ImageZoom from 'react-native-image-pan-zoom';
import md5 from 'md5';
import Util from '@Common/Util';
const { screenSize } = Util;

const { width: WIDTH } = screenSize();

const getSizeImage = (source, wImg, hImg, defaultHeight, cb) => {
  Image.getSize(
    source.uri,
    (width, height) => {
      let w = wImg;
      let h = hImg;
      let _height = defaultHeight;
      if (width && height) {
        if (w && !h) {
          _height = height * (w / width);
        } else if (!w && h) {
          w = width * (h / height);
          _height = h;
        } else if (w && h) {
          _height = h;
        } else {
          w = WIDTH;
          _height = height * (w / width);
        }
      }

      cb({ width: w, height: _height });
    },
    () => {
      cb(null);
    }
  );
};

export default class CImage extends React.PureComponent {
  _mount = false;
  _active = false;

  static defaultProps = {
    delay: 200,
    loadCache: false,
    autoHeight: false,
    activeOpacity: 1,
    bgColor: 'transparent', //'#f4f4f4'
  };

  constructor(props) {
    super(props);
    let { width, height } = this.props;

    this.state = {
      height: height ? height : 'STYLE',
      width: width ? width : 'STYLE',
      source: null,
    };
  }

  async componentDidMount() {
    this._mount = true;
    let { source, autoHeight, width, height, getHeight, onError, defaultHeight } = this.props;
    if (!_.get(source, 'uri', null)) {
      this.setState({ source });
      return;
    }

    getSizeImage(source, width, height, defaultHeight, img => {
      if (!this._mount) return;
      if (!img) {
        onError && onError();
        return;
      }
      this.setState({ source, width: img.width, height: img.height });
      getHeight && getHeight(img.height);
    });
  }

  _onError = () => {
    let { onError } = this.props;
    onError && onError();
  };

  render() {
    let { style, overlayColor, resizeMode, autoHeight, bgColor, isZoom } = this.props;
    let { width, height, source } = this.state;
    let resize = resizeMode || 'contain';
    if (autoHeight) {
      resize = 'cover';
    }
    if (!source) {
      return null;
    }

    if (isZoom) {
      return (
        <ImageZoom
          cropWidth={width !== 'STYLE' ? width : 0}
          cropHeight={height !== 'STYLE' ? height : 0}
          imageWidth={width !== 'STYLE' ? width : 0}
          imageHeight={height !== 'STYLE' ? height : 0}>
          <Image
            ref={'Image'}
            {...this.props}
            source={
              source && typeof source !== 'object'
                ? source
                : { uri: _.get(source, 'uri', null) || '' }
            }
            resizeMethod="resize"
            onLoadEnd={this._onLoadEnd}
            onError={this._onError}
            style={[
              { backgroundColor: bgColor },
              style,
              { resizeMode: resize },
              { overlayColor },
              width !== 'STYLE' ? { width } : {},
              height !== 'STYLE' ? { height } : {},
            ]}
          />
        </ImageZoom>
      );
    }
    return (
      <Image
        ref={'Image'}
        {...this.props}
        source={
          source && typeof source !== 'object' ? source : { uri: _.get(source, 'uri', null) || '' }
        }
        resizeMethod="resize"
        onLoadEnd={this._onLoadEnd}
        onError={this._onError}
        style={[
          { backgroundColor: bgColor },
          style,
          { resizeMode: resize },
          { overlayColor },
          width !== 'STYLE' ? { width } : {},
          height !== 'STYLE' ? { height } : {},
        ]}
      />
    );
  }
}
