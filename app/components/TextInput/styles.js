import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  fieldSet: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontFamily: theme.fontFamilyBold,
    backgroundColor: '#FFFFFF',
  },
  errorColor: {
    color: theme.colors.danger,
  },
  grayColor: theme.colors.greyBorder,
  primaryColor: theme.colors.primary,
  blackColor: theme.colors.black,
}));
