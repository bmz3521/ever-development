import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  topCard: {
    marginTop: 3,
    marginBottom: 3,
    paddingHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  bottomCard: {
    marginHorizontal: 20,
  },
  name: {
    fontFamily: theme.fontFamilyBold,
    paddingTop: 12,
    color: 'black',
    fontSize: 18,
  },
  category: {
    marginTop: 15,
  },
  cText: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 14,
    color: theme.colors.grey1,
  },
  icon: {
    color: 'black',
    width: 25,
    height: 25,
  },
  card: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    padding: 15,
    marginBottom: 1,
    alignItems: 'center',
    borderBottomColor: theme.colors.greyOutline,
  },
  option: {
    fontFamily: theme.fontFamilyBold,
    color: theme.colors.black,
    fontSize: 15,
    marginLeft: 20,
  },
  optionGray: {
    fontFamily: theme.fontFamilyBold,
    color: theme.colors.grey4,
    fontSize: 15,
    marginLeft: 20,
  },
  backgroundColor: {
    backgroundColor: '#f6f6f6',
  },
  content: {
    paddingLeft: 12,
    color: 'ghostwhite',
    fontWeight: 'bold',
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButtonLabel: {
    fontFamily: theme.fontFamilyDefault,
    color: theme.colors.grey2,
    fontSize: 12,
    paddingTop: 5,
  },
  ionicIcons: {
    paddingTop: 7,
  },
  versionCon: {
    marginBottom: 20,
  },
  version: {
    color: '#ccc',
    fontSize: 14,
  },
}));
