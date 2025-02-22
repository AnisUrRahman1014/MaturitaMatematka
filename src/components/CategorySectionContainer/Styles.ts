import {StyleSheet} from 'react-native';
import { AppConstants, Colors, Fonts } from '../../utils/System/Constants';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  categoryHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: moderateScale(16),
    width: '80%',
    color: 'black'
  },
  categoryHeader: {
    paddingTop: moderateScale(20),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  sortCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppConstants.ContainerPaddings.min,
    paddingHorizontal: AppConstants.ContainerPaddings.avg,
  },
});

export default styles;
