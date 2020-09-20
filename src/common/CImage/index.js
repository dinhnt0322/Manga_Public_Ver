import React from 'react';

import { ActivityIndicator, Image, Platform } from 'react-native';

import _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import ImageZoom from 'react-native-image-pan-zoom';
import md5 from 'md5';
import Util from '@Common/Util';
const { screenSize } = Util;

const { width: WIDTH } = screenSize();

const CACHE_ENABLED = Platform.OS !== 'web';
const LIMIT_SIZE_CACHE = 1024 * 1024 * 40; //40 MB

const folder = `${FileSystem.cacheDirectory}image-cache/`;

const getFileExt = url => {
  let fileName = url.substring(
    url.lastIndexOf('/'),
    url.indexOf('?') === -1 ? url.length : url.indexOf('?')
  );
  return fileName.indexOf('.') === -1 ? '.jpg' : fileName.substring(fileName.lastIndexOf('.'));
};

const checkCache = async (url, loadCache) => {
  if (!url) {
    return null;
  }
  let cache = !CACHE_ENABLED ? false : loadCache;
  if (!cache) {
    return { uri: url };
  }

  const ext = getFileExt(url);
  const file = md5(url);
  const output = `${folder}${file}${ext}`;
  const imageInfo = await FileSystem.getInfoAsync(output);
  if (imageInfo.exists) {
    checkFile(imageInfo, url, output);
    return { uri: _.get(imageInfo, 'uri', url) };
  }

  try {
    let file = await FileSystem.downloadAsync(url, output);
    return { uri: _.get(file, 'uri', url) };
  } catch (e) {
    // console.log(e);
    return { uri: url };
  }
};

const checkFile = (info, url, output) => {
  let stop = false;
  let downloadResumable = FileSystem.createDownloadResumable(url, output, {}, progress => {
    if (progress.totalBytesExpectedToWrite !== info.size) {
      stop = true;
      downloadResumable.pauseAsync().then(() => {
        FileSystem.deleteAsync(output);
      });
    }
  });

  downloadResumable.downloadAsync();
};

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

export const checkCacheSize = async () => {
  try {
    const result = await FileSystem.getInfoAsync(folder);
    if (!result.exists) {
      await FileSystem.makeDirectoryAsync(folder);
    }

    await clearCache();

    // console.log(result);
  } catch (e) {
    // console.log(e);
  }
};

export const clearCache = async () => {
  //Function to check cache Image of app then clear if is moreover clear half cache.
  try {
    let files = await FileSystem.readDirectoryAsync(folder);
    let size = 0;
    let listFile = [];
    for (let i of files) {
      let fileInfo = await FileSystem.getInfoAsync(folder + i);
      listFile.push(fileInfo);
      size += fileInfo.size;
    }
    if (size > LIMIT_SIZE_CACHE) {
      listFile = _.sortBy(listFile, 'modificationTime');
      let fileClear = listFile.slice(0, listFile.length / 2);
      for (let i of fileClear) {
        await FileSystem.deleteAsync(i.uri);
      }
    }
  } catch (e) {}
};

export const downImage = data => {
  try {
    for (let i of data) {
      let ext = getFileExt(i);
      let file = md5(i);
      let output = `${folder}${file}.${ext}`;
      FileSystem.downloadAsync(i, output);
    }
  } catch (e) {
    // console.log(e);
  }
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
    let {
      source,
      autoHeight,
      width,
      height,
      getHeight,
      onError,
      loadCache,
      defaultHeight,
    } = this.props;
    if (!_.get(source, 'uri', null)) {
      this.setState({ source });
      return;
    }

    let cache = await checkCache(source.uri, loadCache);
    if (!cache) {
      return;
    }

    if (Platform.OS === 'ios') {
      cache.cache = 'force-cache';
    }

    if (!autoHeight) {
      if (!this._mount) return;
      this.setState({ source: cache });
      return;
    }

    getSizeImage(cache, width, height, defaultHeight, img => {
      if (!this._mount) return;
      if (!img) {
        onError && onError();
        return;
      }
      this.setState({ source: cache, width: img.width, height: img.height });
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
