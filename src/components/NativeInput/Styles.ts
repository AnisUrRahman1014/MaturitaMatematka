import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    marginVertical: '3%',
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: moderateScale(50),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    color: Colors.primaryDark,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
  },
  error: {
    top: -6,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t4,
    color: Colors.red,
    alignSelf: 'flex-end',
  },
});

export default styles;
