import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  linearGradient: {
    backgroundColor: '#00bae5',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  head: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headFont: {
    fontSize: 24,
    fontFamily: 'Prompt-Bold',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  line: {
    width: 0,
    borderWidth: 1.21,
    borderRadius: 10,
    borderColor: BaseColor.darkPrimaryColor,
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
