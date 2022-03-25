import { StyleSheet, Dimensions } from 'react-native';

const { width: wWidth, height: wHeight } = Dimensions.get('screen');
const BOTTOM_SHEET_HEIGHT = wHeight;

export default styles = theme => {
  return StyleSheet.create({
    sheetContainer: {
      position: 'absolute',
      height: BOTTOM_SHEET_HEIGHT,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    header: {
      height: 50,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      justifyContent: 'center',
    },
    barIcon: {
      width: 50,
      height: 3,
      borderRadius: 1.5,
      position: 'absolute',
      top: 8,
      left: (wWidth - 50) / 2,
      backgroundColor: '#ccc',
    },
    closeIcon: {
      position: 'absolute',
      top: 19,
      left: 15,
      zIndex: 85,
    },
    backDrop: {
      ...StyleSheet.absoluteFill,
      flex: 1,
      zIndex: 80,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerTitle: {
      textAlign: 'center',
      marginTop: 17,
      fontSize: 16,
      fontFamily: 'Prompt-Medium',
    },
    contentFirstRow: {
      padding: 15,
      paddingTop: 15,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    createIcon: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginRight: 15,
    },
    creatActionText: {
      fontSize: 18,
      fontFamily: 'Prompt-Medium',
    },
    listContainer: {
      paddingHorizontal: 15,
      overflow: 'hidden',
    },
    listRowWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      justifyContent: 'space-between',
    },
    listName: { fontSize: 16 },
    // SubModal
    popContainer: {
      position: 'absolute',
      top: wHeight / 2 - 125,
      left: wWidth / 2 - wWidth / 1.1 / 2,
      height: 250,
      width: wWidth / 1.1,
      borderRadius: 20,
      paddingTop: 5,
      backgroundColor: 'white',
    },
    popCloseIcon: {
      position: 'absolute',
      zIndex: 300,
      top: 15,
      left: 10,
    },
    popHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    inputWrapper: {
      marginHorizontal: 20,
      marginVertical: 25,
      flex: 1,
      justifyContent: 'center',
    },
    textInput: {
      height: 40,
      marginTop: 10,
      width: '100%',
      fontSize: 15,
      paddingLeft: 15,
      alignSelf: 'center',
      fontFamily: theme.fontFamilyDefault,
    },
    button: {
      marginHorizontal: 15,
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 20,
    },
    createButton: {
      textAlign: 'center',
      color: theme.colors.white,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.grey5,
    },
  });
};
