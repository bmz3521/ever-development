import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  containerDesp: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.greyOutline,
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textTitle: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 30,
  },
  textDesp: {
    fontFamily: theme.fontFamilyDefault,
    fontSize: 16,
    marginTop: 5,
  },
  loginBtn: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.white,
  },
}));
