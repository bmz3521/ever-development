import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  uploadIconContainer: {
    minWidth: 80,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 15,
  },
  uploadBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 10,
  },
  uploadContainer: {
    paddingTop: 15,
    paddingBottom: 55,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  titleUpload: {
    paddingHorizontal: 10,
    fontFamily: 'Prompt-Medium',
    fontSize: 24,
  },
  subTitleUpload: {
    paddingHorizontal: 10,
    fontFamily: 'Prompt-Light',
    fontSize: 14,
  },
  btnUpload: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
    elevation: 2,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
