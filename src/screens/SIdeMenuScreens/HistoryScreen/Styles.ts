import {StyleSheet} from 'react-native';
import {AppConstants, Fonts} from '../../../utils/System/Constants';

const styles = StyleSheet.create({
  mainContainer: {
    padding: AppConstants.ContainerPaddings.avg,
  },
  heading: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
  },
  performanceCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: AppConstants.ContainerPaddings.min,
  },
});

export default styles;
