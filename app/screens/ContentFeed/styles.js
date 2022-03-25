import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    marginBottom: 80,
    padding: 10,
  },
  cardContainer: {
    height: 220,
    width: '100%',
    backgroundColor: 'grey',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
  },
  title: {
    padding: 10,
    color: '#FFFFFF',
  },
  filterCategoriesBar: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,

    justifyContent: 'center',
    alignItems: 'center',
  },
  subCategoriesBar: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  subCategoriesContainer: {
    paddingHorizontal: 5,
  },
  subCategoriesButton: {
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
