import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';

type Props = {
  data: string;
  index: number;
  setSelectedOption: (index: number) => any;
  customStyle?: any; // Additional styles to be applied to the button container.
};
const AnswerOption = (props: Props) => {
  const {data, index, setSelectedOption, customStyle} = props;
  //   console.log(isSelected);
  const indexToAlphabet = (index: number) => {
    if (index < 0 || index >= 26) {
      return 'Invalid Index';
    }
    return String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
  };

  return (
    <TouchableOpacity
      style={{...styles.btn, ...customStyle}}
      onPress={() => setSelectedOption(index)}>
      <Text style={{...styles.btnText, ...customStyle}}>
        {indexToAlphabet(index)}
        {') '}
        {data}
      </Text>
    </TouchableOpacity>
  );
};

export default AnswerOption;
