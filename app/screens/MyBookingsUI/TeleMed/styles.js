import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeaderText: {
    padding: 10,
    paddingBottom: 0,
  },
  showAllButton: {
    marginTop: 'auto',
    padding: 10,
    paddingBottom: 0,
    fontSize: 15,
    fontWeight: '500',
    color: '#00ABF0',
  },
  divider: {
    marginTop: 10,
    color: '#40424B',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  containerCard: {
    flex: 1,
  },
  centerPageItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
