import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  reviewCard: {
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomColor: theme.colors.grey5,
    borderBottomWidth: 1,
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: { padding: 5 },
  reviewTitle: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: { flexDirection: 'row' },
  starWrapper: { width: 100, marginTop: 3 },
  comment: { marginTop: 5 },
  centerPageItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
