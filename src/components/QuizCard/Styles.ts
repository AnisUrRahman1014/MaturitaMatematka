import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: moderateVerticalScale(90),
    maxHeight: moderateScale(90),
    backgroundColor: Colors.white,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    marginVertical: moderateScale(5),
  },
  leftContainer: {
    flex: 0.3,
    backgroundColor: Colors.primaryDark,
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
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
  },
  tagLine: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t4,
    color: Colors.primaryDark,
  },
  correctAnswer: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t4,
    color: Colors.darkGreen,
  },
  icon: {
    width: 80,
    height: 80,
  },
  arrowIcon: {
    position: 'relative',
    top: -25,
    right: 10,
  },
  desc: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
