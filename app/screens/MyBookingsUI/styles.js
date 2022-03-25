import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  tabbar: {
    backgroundColor: 'white',
    height: 50,
    paddingLeft: 10,
  },
  tab: {
    width: 'auto',
    // paddingHorizontal: 15
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  iconTopAppointment: {
    borderWidth: 1,
    borderColor: '#f5f5f5',
    flexDirection: 'row',
    width: '93%',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    shadowColor: '#000',
    backgroundColor: 'green',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
});
