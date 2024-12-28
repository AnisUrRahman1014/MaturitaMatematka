import {StyleSheet} from 'react-native';
import {AppConstants, Fonts} from '../../../utils/System/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: AppConstants.ContainerPaddings.avg, // Fix: Casting to number
  },
  desc: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    textAlign: 'justify',
  },
});

export default styles;
