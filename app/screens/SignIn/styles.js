import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  textInput: {
    fontFamily: theme.fontFamilyDefault,
    fontSize: 15,
    paddingLeft: 15,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  faqContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqText: {
    textAlign: 'center',
    color: theme.colors.grey3,
    marginRight: 10,
  },
  eKycTextButton: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 10,
    fontFamily: theme.fontFamilyBold,
    fontSize: 16,
  },
  thirdPartyTitle: {
    textAlign: 'center',
    marginVertical: 25,
    color: theme.colors.grey3,
    fontSize: 16,
  },
  ctnButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 12,
    marginVertical: 10,
  },
  textCtn: {
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.white,
  },
  textErrorDefault: {
    color: theme.colors.black,
  },
  signInErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: theme.colors.greyBorder,
  },
  contain: {
    padding: 20,
    width: '100%',
  },

  /** NOTE modal third paty signin error */
  titleThirdPartyErrorModal: {
    marginTop: 10,
    color: theme.colors.error,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: theme.fontFamilyBold,
  },
  messageThirdPartyErrorModal: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  buttonThirdPartyErrorModal: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  containThirdPartyErrorModal: {
    width: '100%',
    marginVertical: 10,
  },
}));
