import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rightContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  above: {
    fontWeight: 'bold',
    color: '#3997EA',
  },
  normal: {
    fontWeight: 'bold',
    color: '#0AB678',
  },
  below: {
    fontWeight: 'bold',
    color: '#CC4343',
  },
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'space-evenly',
    padding: 5,
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 15,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    marginRight: 10,
  },
  leftText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Prompt-Regular',
  },
  rightText: {
    color: '#00bae5',
    fontFamily: 'Prompt-Regular',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#535353',
    fontFamily: 'Prompt-Regular',
  },
  leftMeasurement: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#535353',
    fontFamily: 'Prompt-Regular',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Prompt-Regular',
  },
  lineContainer: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#E5E5E5',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dateAndActivity: {
    flex: 1,
    marginRight: 10,
  },
  resultAndDelete: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  statistics: {
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
  },
  expanded: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
});

export default styles;
