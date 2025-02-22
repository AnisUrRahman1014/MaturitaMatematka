import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../../utils/System/Constants';
import {moderateScale} from 'react-native-size-matters';

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
  flatlist: {
    marginVertical: AppConstants.ContainerPaddings.max,
    height: '90%',
  },
  emptyCtn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyTxt: {
    fontFamily: Fonts.LatoRegular,
    fontSize: moderateScale(16),
    color: Colors.red
  },
});

export default styles;
