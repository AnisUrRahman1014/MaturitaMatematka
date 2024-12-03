import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    backgroundColor: Colors.primaryDark,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
  },
  leftIconContainer: {
    flex: 0.2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', // FOR DEBUGGING
  },
  centerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    // backgroundColor: 'blue', // FOR DEBUGGING
  },
  headingLabel: {
    fontFamily: Fonts.LatoBold,
    fontSize: 24,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  rightContainer: {
    flex: 0.2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white', // FOR DEBUGGING
  },
  backArrow: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
