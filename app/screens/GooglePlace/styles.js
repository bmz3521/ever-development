import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  buttonConfirm: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#00BAE5',
    opacity: 0.89,
  },
  textConfirm: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Prompt-Regular',
  },
  map: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});
