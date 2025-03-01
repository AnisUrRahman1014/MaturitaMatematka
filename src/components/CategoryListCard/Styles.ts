import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 90,
    // minHeight: 90,
    // maxHeight: 150,
    backgroundColor: Colors.primaryDark,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flex: 0.3,
    backgroundColor: Colors.primaryLight,
    borderRadius: 15,
  },
  leftInnerContainer: {
    backgroundColor: Colors.white,
    width: '95%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 0.7,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.white,
  },
  tagLine: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t4,
    color: Colors.white,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  arrowIcon: {
    position: 'relative',
    top: -25,
    right: 10,
  },
});

export default styles;
