import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  container: {
    padding: AppConstants?.ContainerPaddings?.max,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionIcon: {
    width: 30,
    height: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headingLabel: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.h3,
    color: Colors.primaryDark,
  },
  questionContainer: {
    paddingVertical: AppConstants.ContainerPaddings.min,
  },
  question: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryDark,
  },
  navBtnsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    position: 'absolute',
    bottom: -50,
    paddingHorizontal: AppConstants.ContainerPaddings.min,
  },
});

export default styles;
