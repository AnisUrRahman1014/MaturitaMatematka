import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryDark,
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: AppConstants.Borders.avg,
    borderColor: Colors.primaryLight,
    borderWidth: 2,
    padding: AppConstants.ContainerPaddings.max,
  },
  horizontalCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: Fonts.LatoRegular,
    color: Colors.white,
    fontSize: AppConstants.FontSizes.h3,
    fontWeight: '600',
  },
  badge: {
    fontFamily: Fonts.LatoRegular,
    color: Colors.white,
    fontSize: AppConstants.FontSizes.h1,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  badgeContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: AppConstants.ContainerPaddings.avg,
  },
  desc: {
    color: Colors.white,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    marginVertical: '1%',
  },
});

export default styles;
