import { BaseColor } from 'app/theme-config';
import { StyleSheet } from 'react-native';
import { makeStyles } from 'react-native-elements';

export default makeStyles(theme => ({
  mapWrapper: {
    height: 240,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}));
