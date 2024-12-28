import {StyleSheet} from 'react-native';
import {AppConstants, Colors, Fonts} from '../../utils/System/Constants';

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    height: 60,
    borderRadius: 5,
    marginBottom: '4%',
    justifyContent: 'center',
    padding: AppConstants.ContainerPaddings.min,
  },
  btnText: {
    fontFamily: Fonts.LatoRegular,
    fontSize: AppConstants.FontSizes.t3,
    color: Colors.primaryDark,
    textAlign: 'left',
  },
});

export default styles;
