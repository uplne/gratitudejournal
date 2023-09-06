import { Dimensions } from 'react-native';

export const getImageSize = (width: number, height: number, offSet: number = 80) => {
  let imageWidth = 0;
  let imageHeight = 0;

  imageWidth = Dimensions.get('window').width - offSet;
  const scaleFactor = width / imageWidth;
  imageHeight = height / scaleFactor;

  return {
    imageWidth,
    imageHeight,
  };
};
