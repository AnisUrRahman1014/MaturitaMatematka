import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Question} from '../../libs/Global';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';

type Props = {
  question: Question;
  index: number;
  onPress: () => void;
};
const QuestionCard = ({question, index, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.question} numberOfLines={3}>{question?.question}</Text>
      <AppIcons.ChevronRightIcon
        size={25}
        color={Colors.primaryDark}
        disabled
      />
    </TouchableOpacity>
  );
};

export default QuestionCard;
