import { StyleSheet, I18nManager, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeContainer: {
    flexBasis: '25%',
  },
  time: {
    fontSize: 11.8,
    color: '#aaa',
    fontFamily: 'Prompt-MediumItalic',
    textAlign: 'center',
  },
  iconContainer: {
    flexBasis: '6%',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: '5%',
  },
  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#ededed',
  },
  noVerticalLine: {
    borderWidth: 0,
  },
  eventContainer: {
    flexBasis: '55%',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    shadowOffset: { width: I18nManager.isRTL ? 8 : -8, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderTopLeftRadius: 0,
    elevation: 6,
  },
  icon: {
    textAlign: 'center',
    width: 20,
    height: 20,
    backgroundColor: '#6F98FA',
    paddingTop: Platform.OS === 'ios' ? 2.5 : 5,
    borderRadius: 10,
    color: '#e0e9ff',
    fontSize: 9,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#e0e9ff',
  },
  title: {
    fontFamily: 'Prompt-Medium',
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginBottom: 5,
    lineHeight: 20,
  },
  description: {
    fontFamily: 'Prompt-Regular',
    textAlign: 'left',
    fontSize: 11.8,
    lineHeight: 18,
    color: '#7C7C7C',
  },
  doctor: {
    fontFamily: 'Prompt-Regular',
    textAlign: 'left',
    fontSize: 11.8,
    lineHeight: 18,
    color: '#7C7C7C',
  },
  makeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
});
