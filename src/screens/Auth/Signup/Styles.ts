import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../../utils/System/Constants';

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcomeTxt: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h3,
    color: Colors.primaryDark,
  },
  appName: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.h2,
    color: Colors.primaryDark,
  },
  label: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryDark,
  },
  dpContainer: {
    width: 200,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {width: 5, height: 4},
  },
  formContainer: {
    paddingVertical: '2%',
    paddingHorizontal: '6%',
  },
});

export default styles;
