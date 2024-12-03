import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  menuIcon: {
    width: 35,
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
    fontSize: AppConstants.FontSizes.h1,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  tagLine: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryDark,
    width: 200,
  },
  heading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
    width: 200,
    paddingLeft: 8,
  },
  dpContainer: {
    backgroundColor: Colors.primaryLight,
    aspectRatio: 1,
    width: '100%',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dpInnerContainer: {
    backgroundColor: Colors.primaryDark,
    aspectRatio: 1,
    width: '95%',
    borderRadius: 80,
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    resizeMode: 'cover',
  },
  categoryIcon: {
    width: 30,
    height: 30,
    aspectRatio: 1,
    borderRadius: 5,
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
