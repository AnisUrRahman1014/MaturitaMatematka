import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../../utils/System/Constants';

const styles = StyleSheet.create({
  mainContainer: {
    padding: AppConstants.ContainerPaddings.max,
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
  sortText: {
    color: Colors.midGrey,
  },
  sortCtn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingVertical: AppConstants.ContainerPaddings.min,
    paddingHorizontal: AppConstants.ContainerPaddings.avg,
  },
});

export default styles;
