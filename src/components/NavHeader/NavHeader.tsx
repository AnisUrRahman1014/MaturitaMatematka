import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';

type Props = {
  leftIcon?: React.ReactNode;
  centerText?: string;
  rightIcon?: React.ReactNode;
};

const NavHeader = (props: Props) => {
  const leftIcon = props.leftIcon;
  const rightIcon = props.rightIcon;
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.leftIconContainer} />}
      <View style={styles.centerContainer}>
        <Text style={styles.headingLabel}>{props.centerText}</Text>
      </View>
      {rightIcon && <View style={styles.rightContainer}>{rightIcon}</View>}
    </View>
  );
};

export default NavHeader;
