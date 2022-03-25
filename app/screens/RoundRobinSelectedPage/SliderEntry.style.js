import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.28;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    // width: itemWidth,
    height: slideHeight,
    paddingHorizontal: 10,
    paddingBottom: 18, // needed for shadow
    borderRadius: 30,
    borderColor: 'grey',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  topBox: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 30,
  },
  textContainerTop: {
    flex: 0.7,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 0.3,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    // justifyContent: 'center',
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    alignSelf: 'center',
    height: 65,
    width: 65,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    // paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: 'red',
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 16,
    // fontStyle: 'italic',
  },
  priceTitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 24,
    // fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
