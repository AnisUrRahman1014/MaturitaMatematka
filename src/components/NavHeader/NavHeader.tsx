import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {useNavigation} from '@react-navigation/native';

type Props = {
  leftIcon?: React.ReactNode;
  centerText?: string;
  rightIcon?: React.ReactNode;
};

const NavHeader = (props: Props) => {
  const leftIcon = props.leftIcon;
  const rightIcon = props.rightIcon;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          <AppIcons.ChevronLeftIcon
            size={30}
            color={Colors.offWhite}
            style={styles.backArrow}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
      <View style={styles.centerContainer}>
        <Text style={styles.headingLabel}>{props.centerText}</Text>
      </View>
      {rightIcon && <View style={styles.rightContainer}>{rightIcon}</View>}
    </View>
  );
};

export default NavHeader;
