import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';

type Props = {
  data: string;
  isActive: boolean;
  drag: any;
  customStyle?: any; // Additional styles to be applied to the button container.
};
const AnswerOptionDraggable = (props: Props) => {
  const {data, drag, customStyle, isActive} = props;
  return (
    <>
      <TouchableOpacity
        style={{...styles.btn, ...customStyle}}
        onLongPress={drag}
        disabled={isActive}>
        <Text style={{...styles.btnText, ...customStyle}}>{data}</Text>
        <AppIcons.DragIcon
          size={30}
          color={customStyle ? customStyle?.color : Colors.primaryDark}
          style={styles.dragIcon}
          disabled
        />
      </TouchableOpacity>
    </>
  );
};

export default AnswerOptionDraggable;
