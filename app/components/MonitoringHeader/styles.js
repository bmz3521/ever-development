import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default styles;
