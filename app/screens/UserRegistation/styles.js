import { makeStyles } from 'react-native-elements';
import { Platform } from 'react-native';

export default makeStyles(theme => ({
  whiteContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ctnRow: {
    flexDirection: 'row',
  },

  addShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  selectButton: {
    borderRadius: 100,
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  /** NOTE previcePage Styles */

  takePhotoButton: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    bottom: 20,
    position: 'absolute',
    justifyContent: 'center',
  },
  backStepButton: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'white',
    top: 10,
    left: 10,
    position: 'absolute',
    justifyContent: 'center',
  },

  textInput: {
    height: 40,
    backgroundColor: theme.colors.white,
    marginTop: 10,
    padding: 10,
    width: '100%',
    marginHorizontal: 10,
  },
  textInputMain: {
    fontFamily: theme.fontFamilyDefault,
    fontSize: 15,
    paddingLeft: 15,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textInputContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
  contain: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  fieldSet: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#E6E6E6',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFFFFF',
  },

  formTitleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: theme.colors.white,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addressPlaceholder: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingVertical: 10,
  },
  addressPlaceHolderText: {
    textAlign: 'center',
  },
  addressBtn: {
    marginTop: 10,
    padding: 10,
    margin: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    width: '98%',
  },
  monthYearInput: {
    fontFamily: theme.fontFamilyDefault,
    fontSize: 16,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },

  /** NOTE Register form */
  dateInput:
    Platform.OS === 'ios'
      ? {
          fontFamily: theme.fontFamilyDefault,
          fontSize: 16,
          width: '80%',
          marginBottom: -1,
          backgroundColor: 'white',
          marginTop: 10,
          marginBottom: 5,
          borderRadius: 5,
          textAlign: 'center',
        }
      : {
          fontFamily: theme.fontFamilyDefault,
          fontSize: 16,
          width: '80%',
          borderRadius: 5,
          textAlign: 'center',
        },

  errorText: {
    fontSize: 10,
    color: theme.colors.danger,
    marginLeft: 10,
    marginBottom: 5,
  },
  errorColor: {
    color: theme.colors.danger,
  },

  textDefault: {
    // fontFamily: theme.fontFamilyDefault,
    fontSize: theme.fontSizeDefault,
  },
  textDescription: {
    color: '#585858',
    textAlign: 'center',
    marginBottom: 16,
  },
  titleDefault: {
    fontFamily: theme.fontFamilyBold,
  },

  /** NOTE Success Modal */
  modalSubtitle: {
    marginBottom: 15,
    color: theme.colors.primary,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    fontSize: 18,
  },
  modalSuccessTitle: {
    marginBottom: 10,
    color: theme.colors.primary,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    fontSize: 26,
  },
  thankyouContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  congratsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  modalViewSuccess: {
    flex: 1,
    margin: 0,
    backgroundColor: 'white',
  },
  openButton: {
    backgroundColor: theme.colors.danger,
    marginTop: 15,
    borderRadius: 15,
  },

  /** NOTE Error Modal */

  modalFailureTitle: {
    marginBottom: 15,
    fontFamily: theme.fontFamilyBold,
    color: theme.colors.danger,
    textAlign: 'center',
    fontSize: 20,
  },
  modalView: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },

  pickerAndroid: {
    fontSize: 18,
    padding: 10,
    width: 370,
    margin: 5,
    alignSelf: 'flex-start',
    borderColor: '#CCCCCC',
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '98%',
  },

  actionBtn: {
    fontFamily: theme.fontFamilyBold,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
  },
  textPress: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: theme.colors.white,
  },
  labelAddress: {
    position: 'absolute',
    top: 5,
    color: '#999999',
    backgroundColor: 'transparent',
    paddingLeft: 15,
  },
  textBoxShow: {
    // fontSize: 16,
    flex: 1,
  },

  placeHolderImage: {
    width: '100%',
    height: 230,
    paddingHorizontal: 10,
  },

  previewImageContainer: {
    borderRadius: 20,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10,
    marginHorizontal: 20,
    width: '100%',
    height: 130,
    borderWidth: 1,
    borderColor: theme.colors.grey3,
    flexDirection: 'row',
  },

  btnContainer: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  btnSubmit: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15,
    backgroundColor: theme.colors.primary,
  },
  fontSizeDefault: theme.fontSizeDefault,
  primaryColor: theme.colors.primary,
  placeholderColor: theme.colors.grey3,
  whiteColor: theme.colors.white,
}));
