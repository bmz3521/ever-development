import { StyleSheet, Platform } from 'react-native';

const styles = theme =>
  StyleSheet.create({
    doctorCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      marginVertical: 5,
      borderRadius: 5,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    doctorAvatarContainer: {
      padding: 10,
    },
    doctorInfoContainer: {
      flex: 5,
      padding: 5,
    },
    doctorNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
    },
    doctorName: {
      fontSize: theme.fontSizeSmall,
      fontFamily: theme.fontFamilyDefault,
    },
    firstIconRow: {
      flexDirection: 'row',
      padding: 3,
      marginTop: 5,
    },
    iconRow: {
      flexDirection: 'row',
      padding: 3,
    },
    detail: {
      fontSize: theme.fontSizeSmallest,
      color: '#696969',
      fontFamily: theme.fontFamilyDefault,
      marginLeft: 3,
    },
    clinicCardContainer: {
      backgroundColor: '#ffffff',
      marginVertical: 7,
      borderRadius: 5,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    clinicImageContainer: {
      padding: 10,
      height: 200,
      flex: 1,
    },
    clinicInfoContainer: {
      flexDirection: 'row',
    },
    clinicDetailContainer: {
      flex: 5,
      padding: 10,
    },
    clinicNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
    },
    clinicName: {
      fontSize: theme.fontSizeSmall,
      color: '#696969',
      fontFamily: theme.fontFamilyBold,
    },
    ratingReviewContainer: {
      flex: 2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    ratingText: {
      fontSize: 24,
      color: '#696969',
      fontFamily: theme.fontFamilyDefault,
      marginLeft: 3,
    },
    reviewContainer: {
      alignItems: 'flex-end',
    },
    reviewText: {
      fontSize: theme.fontSizeSmallest,
      color: '#696969',
      fontFamily: 'Prompt-Light',
      marginLeft: 3,
    },
    clinicPackageCardContainer: {
      backgroundColor: '#ffffff',
      marginVertical: 7,
      borderRadius: 5,
      shadowColor: theme.colors.shadows,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    hScrollViewContainer: {
      backgroundColor: theme.colors.grey5,
      padding: 10,
    },
    searchBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: 5,
      marginBottom: 5,
    },
    searchInput: {
      fontSize: theme.fontSizeDefault,
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      color: theme.colors.grey3,
      fontFamily: theme.fontFamilyDefault,
    },
  });

export default styles;
