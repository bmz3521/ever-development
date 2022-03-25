import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    width: 200,
    alignSelf: 'center',
  },
  iconStyle: { width: 20, height: 20, paddingHorizontal: 10 },
  loginBtn: {
    marginVertical: 5,
    borderColor: theme.colors.greyOutline,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 15,
  },
  text: {
    paddingHorizontal: 6,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fontFamilyDefault,
    fontWeight: 'bold',
  },
  appleButton: {
    width: '100%',
    height: 50,
    marginVertical: 5,
    borderColor: 'red',
  },
}));
