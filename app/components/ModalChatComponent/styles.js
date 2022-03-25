import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    closeBtnContainer: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#f3f3f3',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: '#aaa',
      borderTopWidth: 0.5,
    },
    headerContainer: {
      height: 50,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    flexEndContainer: { flex: 1, justifyContent: 'flex-end' },
  });
