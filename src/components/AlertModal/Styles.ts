import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    width: '92%',
    minHeight: verticalScale(212),
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignSelf: 'center',
    padding: moderateScale(20),
  },
  headingContainer: {
    width: '100%',
    height: verticalScale(42),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#CCE4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.LatoBold,
    color: Colors.primaryDark,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.LatoBold,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: scale(135),
    height: verticalScale(47),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderRadius: moderateScale(8),
  },
  btnText: {
    fontSize: 12,
    fontFamily: Fonts.LatoBold,
    color: Colors.primaryDark,
  },
});

export default styles;
