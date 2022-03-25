import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import { makeStyles } from 'react-native-elements';

export default makeStyles((theme, ready) => ({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
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
  resultContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 25,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderRadius: 5,
    padding: 10,
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
}));
