import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  introContainer: {
    // flex: 1,
    padding: '5%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: '25%',
  },
  titleAndTagContainer: {
    width: 180,
    marginRight: 28,
  },
  title: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h3,
    fontWeight: '600',
  },
  tagLine: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t3,
    width: 180,
  },
  iconContainerBG: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -70,
    right: 10,
    paddingLeft: 5,
    zIndex: -1,
    width: 250,
    height: 250,
  },
  iconContainerFG: {
    position: 'relative',
    top: -10,
    backgroundColor: Colors.white,
    borderRadius: 200,
    width: '95%',
    aspectRatio: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '12%',
  },
  icon: {
    width: moderateScale(130),
    height: moderateScale(130),
    borderRadius: moderateScale(200)
  },
  categoryIcon: {
    width: 30,
    height: 30,
    aspectRatio: 1,
    borderRadius: 5,
  },
  heading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
    width: 200,
    paddingLeft: 8,
  },
  descriptionContainer: {
    padding: '5%',
    // backgroundColor: 'red',
    jus: 'flex-start',
  },
  description: {
    fontFamily: Fonts.LatoLight,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryDark,
    textAlign: 'justify',
  },
});
export default styles;

export const section = (flexSize: number, flexDir: 'row' | 'column') => ({
  flex: flexSize,
  flexDirection: flexDir,
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: 'blue',
});
