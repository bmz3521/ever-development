import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    cardContainer: {
      padding: 10,
      marginVertical: 8,
      margin: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    iconHosp: {
      width: 50,
      height: 50,
      marginRight: 16,
    },
    rowcenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fullWidth: { flex: 1 },
    moreCardContainer: {
      padding: 15,
      marginVertical: 10,
    },
    spaceBootom: { marginBottom: 5 },
    labelDoctorContainer: {
      marginHorizontal: 10,
      flex: 1,
    },
    marginHor16: { marginHorizontal: 16 },
    titleCard: {
      padding: 10,
      marginBottom: 10,
    },
    labelTime: {
      marginVertical: 5,
    },
    labelDoctor: {
      marginBottom: 10,
    },
    blackFont: { color: 'black' },
    greyColor: { color: '#666' },
    subtitleClinic: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 14,
    },
    defaultText: {
      fontFamily: theme.fontFamilyDefault,
    },
  });
