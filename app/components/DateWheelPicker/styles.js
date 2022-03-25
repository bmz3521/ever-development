import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.16)',
    width: '100%',
    height: '100%',
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  innerContainer: { alignItems: 'center', paddingTop: 10, paddingBottom: 40 },
  titlePicker: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 16,
  },
  labelText: {
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.white,
  },
  btnContainer: {
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    width: '40%',
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  btnDismissContainer: {
    borderRadius: 15,
    backgroundColor: theme.colors.grey4,
    width: '40%',
    marginHorizontal: 5,
    paddingVertical: 10,
  },
}));
