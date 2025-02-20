import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  menuIcon: {
    width: moderateScale(35),
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  userName: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h2,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  tagLine: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryDark,
    width: moderateScale(200),
  },
  heading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
    width: moderateScale(200),
    paddingLeft: 8,
  },
  dpContainer: {
    backgroundColor: Colors.primaryLight,
    aspectRatio: 1,
    width: '100%',
    borderRadius: moderateScale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dpInnerContainer: {
    backgroundColor: Colors.offWhite,
    aspectRatio: 1,
    width: '95%',
    borderRadius: moderateScale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(200),
    resizeMode: 'cover',
  },
  categoryIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    aspectRatio: 1,
    borderRadius: moderateScale(5),
  },
  categoryContentCtn: {
    padding: moderateScale(15),
    gap: moderateScale(15),
  },
  flatlist: {
    width: '100%',
  },
});

export default styles;

// Dynamic function for styles
export const section = (flexSize: number, flexDir: 'row' | 'column') => ({
  flex: flexSize,
  flexDirection: flexDir,
  alignItems: 'center',
  justifyContent: 'center',
});
