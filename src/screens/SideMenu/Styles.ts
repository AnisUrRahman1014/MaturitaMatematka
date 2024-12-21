import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  menuIcon: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  btn: {
    width: '100%',
    height: verticalScale(42),
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: '10%',
  },
  iconContainer: {
    width: moderateScale(27),
    height: moderateScale(27),
    borderRadius: moderateScale(12),
  },
  label: (focused: boolean) => ({
    fontSize: moderateScale(12, 0.3),
    fontWeight: '500',
    color: focused ? Colors.white : Colors?.primaryDark,
    marginLeft: scale(12),
  }),
  unselectLabel: {
    fontSize: moderateScale(12, 0.3),
    fontFamily: Fonts.LatoBold,
    color: '#A0AEC0',
    marginLeft: scale(20.5),
  },
});

export default styles;
