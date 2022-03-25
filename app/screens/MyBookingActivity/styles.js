import { StyleSheet } from 'react-native';

export default theme => {
  return StyleSheet.create({
    safeAreaView: { flexGrow: 1 },
    wrapper: { flex: 1 },
    bookingTypeWrapper: {
      paddingBottom: 10,
      paddingLeft: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bookingTypeLottie: { height: 100, marginBottom: 20, marginTop: 3 },
    bookingDetailWrapper: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 20,
    },
    bookingDetailItemContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    practitionerDetailWrapper: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
      margin: 10,
    },
    practitionerDetailContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 10,
    },
    practitionerAvatar: {
      backgroundColor: theme.colors.grey4,
      margin: 5,
    },
    practitionerDescriptionContainer: {
      paddingHorizontal: 5,
      flex: 1,
    },
    userSymptomWrapper: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
      margin: 10,
    },
    userSymptomDescriptionContainer: {
      padding: 10,
      borderWidth: 1,
      marginHorizontal: 10,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: theme.colors.grey5,
    },
    userSymptomImageWrapper: { paddingHorizontal: 10, marginBottom: 10 },
    userSymptomImageContainer: {
      marginVertical: 5,
      overflow: 'hidden',
      borderRadius: 10,
      alignSelf: 'flex-start',
    },
    userSymptomImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 135 / 76,
      resizeMode: 'center',
    },
    paymentWrapper: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
      margin: 10,
    },
    paymentSummaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    paymentDetailWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.grey5,
      margin: 10,
      borderRadius: 10,
      padding: 10,
    },
  });
};
