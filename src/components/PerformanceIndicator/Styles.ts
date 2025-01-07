import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '98%',
    height: moderateVerticalScale(150, 0.3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    backgroundColor: Colors.primaryDark,
    borderRadius: AppConstants.Borders.ultra,
    width: '85%',
    height: '70%',
    justifyContent: 'space-between',
    padding: AppConstants.ContainerPaddings.max,
  },
  rightContainer: {
    backgroundColor: Colors.white,
    width: '40%',
    aspectRatio: 1,
    borderRadius: moderateVerticalScale(1000),
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: Colors.primaryDark,
    width: '88%',
    aspectRatio: 1,
    borderRadius: moderateVerticalScale(1000),

    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    color: Colors.white,
    fontSize: AppConstants.FontSizes.t2,
    fontFamily: Fonts.LatoRegular,
    textAlign: 'center',
  },
  focus: {
    color: Colors.white,
    fontSize: AppConstants.FontSizes.h1,
    fontFamily: Fonts.LatoBold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  innerTextCtn: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  innerCircleTxt1: {
    color: Colors.white,
    fontSize: AppConstants.FontSizes.h2,
    fontFamily: Fonts.LatoBold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  innerCircleTxt2: {
    color: Colors.white,
    fontSize: AppConstants.FontSizes.t2,
    fontFamily: Fonts.LatoBold,
    textAlign: 'center',
    width: '70%',
  },
});

export default styles;
