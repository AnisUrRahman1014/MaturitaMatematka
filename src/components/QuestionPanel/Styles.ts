import {Dimensions, StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
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
  optionsContainer: {
    paddingVertical: AppConstants.ContainerPaddings.max,
  },
  count: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t3,
    color: Colors.midGrey,
    textAlign: 'right',
  },
  // submitBtn: {
  //   width: 250,
  //   aspectRatio: 1,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 30,
  //   backgroundColor: 'red',
  // },
  correctAnswerBG: {
    borderColor: Colors.darkGreen,
    backgroundColor: Colors.lightGreen,
    opacity: 0.1,
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
  },
  question: {
    color: Colors.primaryDark,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t3,
  },
  subHeading: {
    marginVertical: moderateVerticalScale(10),
    color: Colors.primaryLight,
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.t1,
  },
  correctAnswer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: AppConstants.ContainerPaddings.avg,
  },
  correctAnswerHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.t1,
    color: Colors.darkGreen,
    marginVertical: AppConstants.ContainerPaddings.min,
    marginHorizontal: AppConstants.ContainerPaddings.avg,
  },
  correctAnswerTxt: {
    color: Colors.darkGreen,
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
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
  },
  wrongAnswer: {
    height: 'auto',
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: AppConstants.ContainerPaddings.avg,
  },
  wrongAnswerHeading: {
    fontFamily: Fonts.LatoBold,
    fontSize: AppConstants.FontSizes.t1,
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
  nextBtn: {
    backgroundColor: Colors.primaryLight,
    marginTop: '15%',
    height: moderateScale(50),
  },
  submitBtn:{
    marginTop: '15%',
    height: moderateScale(50),
  }
});

export default styles;
