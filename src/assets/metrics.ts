import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const METRICS = {
  baseSize: 16,
  baseMargin: 8,
  navbarHeaderHeight: height * 0.07,
  navbarFooterHeight: height * 0.07,
  fontSize: 16,
  iconSize: 16,
  androidElevation: 1,
};

export default METRICS;
