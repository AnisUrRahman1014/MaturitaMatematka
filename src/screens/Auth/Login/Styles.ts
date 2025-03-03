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
  logoContainer: {
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
  forgetPass: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t3,
    color: Colors.midGrey,
    textAlign: 'right',
    marginBottom: '3%',
  },
  separator: {
    marginVertical: '3%',
    backgroundColor: Colors.primaryDark,
    width: '90%',
    height: 0.7,
    alignSelf: 'center',
  },
  signUpBtnContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default styles;
