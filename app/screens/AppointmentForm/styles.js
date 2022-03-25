import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  addImageBtn: {
    maxWidth: 90,
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    elevation: 2,
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0.6,
  },
  imageContainer: {
    marginVertical: 5,
    overflow: 'hidden',
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  imageStyles: {
    width: '70%',
    maxWidth: 350,
    aspectRatio: 4 / 3,
    resizeMode: 'cover',
  },
});
