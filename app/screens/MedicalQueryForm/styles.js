import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  wrapper: {
    marginBottom: 18,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    // marginBottom: 18,
  },
  messagesInput: {
    padding: 10,
    fontFamily: theme.fontFamilyDefault,
    fontSize: theme.fontSizeSmall,
  },
  label: {
    paddingLeft: 10,
  },
  textInput: {
    padding: 10,
    paddingTop:5,
    fontFamily: theme.fontFamilyDefault,
    fontSize: theme.fontSizeSmall,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
  },
  messageWrapper: {
    height: 200,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    borderRadius: 15,
    flexDirection: 'row',
  },
  messageLeft: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
    paddingRight: 5,
    flex: 1,
  },
  messageRight: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  footer: {
    padding: 10,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.shadows,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 1,
  },
  bottomBtnText: {
    color: theme.colors.white,
    alignSelf: 'center',
  },
  bottomBtnTextDis: {
    color: theme.colors.grey3,
    alignSelf: 'center',
  },
  bottomBtn: {
    width: '95%',
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  errorText: {
    fontSize: 10,
    color: theme.colors.danger,
    marginLeft: 10,
    paddingTop: 3,
  },
}));
