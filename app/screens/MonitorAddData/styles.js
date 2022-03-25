import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  save: {
    flex: 1,
    height: 50,
    marginTop: 10,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#00bae5',
  },
  buttonTextAdd: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 186, 229, .2)',
  },
  modalActivity: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
});

export default styles;
