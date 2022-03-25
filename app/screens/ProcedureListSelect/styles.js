import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
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
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  listCard: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey4,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerWrapper: {
    marginTop: 10,
  },
  headerText: {
    textAlign: 'center',
  },
  headerIcon: {
    position: 'absolute',
    right: 15,
  },
  searchContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  searchWrapper: {
    borderColor: theme.colors.grey5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontFamily: theme.fontFamilyDefault,
    color: theme.colors.grey4,
  },
}));
