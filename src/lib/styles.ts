import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  shadowContainer2: {
    ...Platform.select({
      android: {
        elevation: 0.5, // Adjust the elevation as needed
      },
      ios: {
        // Drop shadow styles for iOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
    }),
  },
  shadowContainer: {
    // Drop shadow styles for Android
    ...Platform.select({
      android: {
        elevation: 60, // Adjust the elevation as needed
      },
      ios: {
        // Drop shadow styles for iOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
    }),
  },
  wrapper: {
    flex: 1,
  },
  zeroOpacity: {opacity: 0},
  dev: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cwrapper: {
    flex: 1,
    padding: 20,
  },
  w_100: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  banner: {
    paddingVertical: 10,
  },
  textGreen: {
    color: '#2AD23B',
  },
  textRed: {
    color: 'red',
  },
  bg_green: {
    backgroundColor: '#2AD23B',
  },
  py_1: {
    paddingVertical: 10,
  },
  bg: {
    backgroundColor: '#F7F7F7',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  spaceBtw: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
});
