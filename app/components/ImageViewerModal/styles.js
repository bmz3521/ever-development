import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 100,
    padding: 8,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 25,
  },

  /** NOTE This style copy from react-native-image-zoom-viewer base files. */
  indicatorContainer: {
    position: 'absolute',
    top: 38,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 13,
  },

  textIndicator: {
    color: theme.colors.white,
    fontSize: theme.fontSizeDefault,
    fontFamily: theme.fontFamilyDefault,
  },
}));
