import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: AppConstants.ContainerPaddings.min,
    paddingVertical: AppConstants.ContainerPaddings.max,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primaryDark,
    marginVertical: 5,
    height: 'auto',
  },
  correctAnswerBG: {
    borderColor: Colors.darkGreen,
    backgroundColor: Colors.primaryLight,
    opacity: 0.1,
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
  },
  correctAnswer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    justifyContent: 'center',
    marginBottom: AppConstants.ContainerPaddings.avg,
  },
  correctAnswerHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.primaryLight,
    marginVertical: AppConstants.ContainerPaddings.min,
    marginHorizontal: AppConstants.ContainerPaddings.avg,
  },
  correctAnswerTxt: {
    color: Colors.primaryLight,
    marginTop: 5,
    margin: AppConstants.ContainerPaddings.avg,
    textAlign: 'justify',
  },
  wrongAnswerBG: {
    borderColor: Colors.red,
    backgroundColor: Colors.red,
    opacity: 0.1,
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
  },
  wrongAnswer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: Colors.red,
    justifyContent: 'center',
    marginBottom: AppConstants.ContainerPaddings.avg,
  },
  wrongAnswerHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.t2,
    color: Colors.red,
    marginVertical: AppConstants.ContainerPaddings.min,
    marginHorizontal: AppConstants.ContainerPaddings.avg,
  },
  wrongAnswerTxt: {
    color: Colors.red,
    marginTop: 5,
    margin: AppConstants.ContainerPaddings.avg,
    textAlign: 'justify',
  },
  question: {
    width: '80%',
    textAlignVertical: 'center',
  },
});
export default styles;
