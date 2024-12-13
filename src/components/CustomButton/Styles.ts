import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  btn: {
    // width: '80%',
    width: 'auto',
    height: '10%',
    marginVertical: '1%',
    backgroundColor: Colors.primaryDark,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '6%',
  },
  whiteBtn: {
    // width: '80%',
    width: 'auto',
    height: '10%',
    marginVertical: '2%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '6%',
  },
  label: {
    flex: 1,
    // backgroundColor: 'red',
    textAlign: 'center',
    fontFamily: Fonts.LatoRegular,
    color: Colors.white,
    fontSize: AppConstants.FontSizes.h4,
  },
  whiteLabel: {
    flex: 1,
    // backgroundColor: 'red',
    textAlign: 'center',
    fontFamily: Fonts.LatoRegular,
    color: Colors.primaryDark,
    fontSize: AppConstants.FontSizes.h4,
  },
  arrowIcon: {
    flex: 0.3,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    flex: 0.2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
