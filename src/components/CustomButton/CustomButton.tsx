import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './Styles';
import {Colors, Fonts} from '../../utils/System/Constants';
import AppIcons from '../../libs/NativeIcons';
import {Images} from '../../../assets/images';

type Props = {
  label: any;
  containerStyle?: any;
  onPress: any;
  rightIconBtn?: any;
  boldLabel?: any;
  iconColor?: any;
  iconSize?: any;
  lightBtn?: any;
  darkBtn?: any;
  leftIconEnabled?: any;
};

const CustomButton = (props: Props) => {
  const {
    label,
    containerStyle,
    onPress,
    rightIconBtn,
    boldLabel,
    lightBtn,
    iconColor = Colors.white,
    iconSize = 20,
    leftIconEnabled,
  } = props;

  if (lightBtn) {
    return (
      <TouchableOpacity
        style={{...styles.whiteBtn, ...containerStyle}}
        onPress={onPress}>
        {leftIconEnabled && (
          <View style={styles.leftIcon}>
            <Image
              source={Images.GoogleIcon}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          </View>
        )}
        {boldLabel ? (
          <Text style={{...styles.whiteLabel, fontFamily: Fonts.LatoBold}}>
            {label}
          </Text>
        ) : (
          <Text style={{...styles.whiteLabel}}>{label}</Text>
        )}
        {rightIconBtn && (
          <AppIcons.ChevronRightCircleO
            size={iconSize}
            color={Colors.primaryDark}
            disabled
          />
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{...styles.btn, ...containerStyle}}
        onPress={onPress}>
        {boldLabel ? (
          <Text style={{...styles.label, fontFamily: Fonts.LatoBold}}>
            {label}
          </Text>
        ) : (
          <Text style={{...styles.label}}>{label}</Text>
        )}
        {rightIconBtn && (
          <AppIcons.ChevronRightCircleO
            size={iconSize}
            color={iconColor}
            disabled
          />
        )}
      </TouchableOpacity>
    );
  }
};

export default CustomButton;
