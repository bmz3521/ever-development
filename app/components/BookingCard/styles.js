import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    borderColor: BaseColor.textSecondaryColor,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 18,
    paddingBottom: 18,
  },
  boxShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  topCard: {
    borderBottomColor: BaseColor.lightGrayColor,
    borderBottomWidth: 0,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  userAva: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  topIcon: {
    height: 15,
    width: 15,
    marginLeft: -1,
    marginRight: 8,
  },
  timeContainer: {
    justifyContent: 'center',
    marginTop: 3,
    marginLeft: 5,
    paddingTop: 12,
    paddingBottom: 17,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: '#535353',
  },
  timeBigText: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: '#535353',
  },
  iconContainer: {
    marginLeft: -2,
  },
  titleIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#085394',
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  statusWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    color: '#085394',
  },
  bookingTypeText: {
    fontSize: 14,
    color: '#535353',
  },
});

export default styles;
