import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  container: {
    marginVertical: '3%',
    flexDirection: 'row',
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    borderRadius: 12,
    height: 60,
    paddingRight: '5%',
    paddingVertical: '2%',
  },
  iconContainer: {
    flex: 0.2,
    height: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    flex: 0.8,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    color: Colors.primaryDark,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t2,
  },
  eyeContainer: {
    flex: 0.1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  error: {
    top: -6,
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t4,
    color: Colors.red,
    alignSelf: 'flex-end',
  },
});

export default styles;
