import {StyleSheet} from 'react-native';
import {AppConstants, Colors} from '../../utils/System/Constants';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    padding: AppConstants.ContainerPaddings.avg,
  },
  questionsContainer: {
    // backgroundColor: 'red',
    padding: AppConstants.ContainerPaddings.avg,
  },
  btn: {
    height: moderateScale(50),
    backgroundColor: Colors.primaryLight,
  },
});

export default styles;
