import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderColor: Colors.primaryDark,
    paddingHorizontal: AppConstants.ContainerPaddings.min,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10),
    paddingBottom: moderateScale(5),
  },
  question: {
    fontFamily: Fonts.LatoLight,
    fontSize: AppConstants.FontSizes.t1,
    width: '80%',
  },
});

export default styles;
