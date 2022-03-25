import { StyleSheet } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    markdown: {
      body: {
        fontFamily: theme.fontFamilyDefault,
        fontSize: theme.fontSizeSmall,
      },
      heading1: {
        fontSize: 26,
        fontFamily: theme.fontFamilyBold,
      },
      heading2: {
        fontSize: theme.fontSizeLargest,
        fontFamily: theme.fontFamilyBold,
      },
      heading3: {
        fontSize: theme.fontSizeDefault,
        fontFamily: theme.fontFamilyBold,
      },
      heading4: {
        fontSize: theme.fontSizeSmall,
        fontFamily: theme.fontFamilyBold,
      },
      heading5: {
        fontSize: theme.fontSizeSmaller,
        fontFamily: theme.fontFamilyBold,
      },
      heading6: {
        fontSize: theme.fontSizeSmallest,
        fontFamily: theme.fontFamilyBold,
      },
      strong: {
        fontFamily: theme.fontFamilyBold,
        fontWeight: '600',
        fontSize: theme.fontSizeSmall,
      },
      em: {
        fontFamily: theme.fontFamilyDefault,
      },
      s: {
        fontFamily: theme.fontFamilyDefault,
      },
    },
    bottomSpace: {
      height: 30,
    },
  });

export default styles;
