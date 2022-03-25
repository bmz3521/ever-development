import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 18,
    paddingTop: 22

  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    marginBottom: 20,
  },
  officerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
    flex: 1.5,
  },
  circle: {
    backgroundColor: '#00bae5',
    width: 130,
    height: 130,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circleSmall: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 12,
  },
  section1: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.28,
  },
  section2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
  },
  section3: {
    flex: 0.15,
    alignItems: 'center',
    top: 50,
  },
  section4: {
    flex: 0.1,
    alignItems: 'center',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
    marginBottom: 8,
  },
  label: {
    color: '#00bae5',
    fontWeight: 'bold',
    marginHorizontal: 50,
    marginBottom: 30,
  },
  timeText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  timeText2: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  greenIcon: {
    color: '#17B87B',
    fontSize: 25,
  },
  greenText: {
    color: '#17B87B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blueIcon: {
    color: '#00bae5',
    fontSize: 25,
  },
  blueText: {
    color: '#00bae5',
    fontSize: 12,
    fontWeight: 'bold',
  },
  linearGradient: {
    backgroundColor: '#00bae5',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  userAva: {
    marginLeft: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 15,
  },
  userProfile: {
    flexDirection: 'column',
  },
  doctorProfile: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    marginVertical: 2,
  },
  doctorText: {
    fontSize: 12,
    flex: 1,
  },
  doctorName: {
    color: '#00bae5',
    marginLeft: 20,
    fontSize: 16,
    flex: 1,
  },
  officerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535353',
  },
  officerIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#535353',
  },
  lineContainer: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  titleContainer: {
    marginBottom: 10,
  },
  wrapName: {
    flexDirection: 'row',
    width: '88%',
  },
  serviceIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#535353',
  },
  serviceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#535353',
  },
});
