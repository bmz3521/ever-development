import { makeStyles } from 'react-native-elements';
import { Platform } from 'react-native';

export default makeStyles(theme => ({
  cText: {
    fontFamily: theme.fontFamilyDefault,
    color: theme.colors.grey2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  hyperLinkColor: {
    color: '#0000EE',
  },
  ctaBtn: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnRow: {
    flexDirection: 'row',
  },
  ctaBtnTxt: {
    fontFamily: theme.fontFamilyDefault,
    fontSize: theme.fontSizeDefault,
    color: theme.colors.white,
  },
  title: {
    flexShrink: 1,
    fontFamily: theme.fontFamilyBold,
    fontSize: theme.fontSizeDefault,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIconContainer: {
    alignItems: 'flex-end',
    padding: 5,
    backgroundColor: theme.colors.grey5,
    borderRadius: 100,
  },
  checkBox: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bgPrimary: {
    backgroundColor:
      Platform.OS === 'android' ? '#00BAE5' : theme.colors.primary,
  },
  bgGrey: {
    backgroundColor: 'gray',
  },

  markdown: {
    body: {
      fontFamily: theme.fontFamilyDefault,
    },
    strong: {
      fontFamily: theme.fontFamilyBold,
      fontWeight: '600',
    },
    em: {
      fontFamily: theme.fontFamilyDefault,
    },
    s: {
      fontFamily: theme.fontFamilyDefault,
    },
    heading6: {
      fontSize: 18,
      fontFamily: theme.fontFamilyBold,
    },
  },
  fontSizeDefault: theme.fontSizeDefault,
  primaryColor: Platform.OS === 'android' ? '#00BAE5' : theme.colors.primary,
  placeholderColor: theme.colors.grey3,
}));
