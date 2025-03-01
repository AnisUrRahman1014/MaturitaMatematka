import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../../utils/System/Constants';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    padding: AppConstants.ContainerPaddings.avg,
  },
  rowCtn: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 30,
    height: 30,
    aspectRatio: 1,
    borderRadius: 5,
  },
  pgHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.h4,
    color: Colors.primaryDark,
    paddingLeft: 8,
  },
  flatlist: {
    height: '87%',
  },
  emptyCtn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyTxt: {
    fontFamily: Fonts.LatoRegular,
    fontSize: moderateScale(16),
    color: Colors.red,
  },
});

export default styles;
