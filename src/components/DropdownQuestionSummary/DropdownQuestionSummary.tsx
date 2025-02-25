import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {Images} from '../../../assets/images';
import {Answer, Question} from '../../libs/Global';

type Props = {
  answer: Answer;
  setSelectedIndex: any;
  expandView: boolean;
  index: Number;
};
const DropdownQuestionSummary = ({
  answer,
  expandView,
  index,
  setSelectedIndex,
}: Props) => {
  console.log(answer);
  // const [expandView, setExpandView] = useState<Boolean>(false);
  const [isCorrect, setIsCorrect] = useState<Boolean>(answer?.isCorrect);
  const [isExpanded, setIsExpanded] = useState<Boolean>(expandView);
  const showExplanation = () => {
    switch (answer?.type) {
      case 'choices':
        if (isCorrect) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />
              <Text style={styles.correctAnswerHeading}>
                Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.correctAnswerHeading}>Explanation:</Text>
              <Text style={styles.correctAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>
                Your Answer: {answer?.givenAnswer}
              </Text>
              <Text style={styles.wrongAnswerHeading}>
                Correct Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.wrongAnswerHeading}>Explanation:</Text>
              <Text style={styles.wrongAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        }
      case 'order':
        if (isCorrect) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />
              <Text style={styles.correctAnswerHeading}>
                Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.correctAnswerHeading}>Explanation:</Text>
              <Text style={styles.correctAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>
                Your Answer: {answer?.givenAnswer}
              </Text>
              <Text style={styles.wrongAnswerHeading}>
                Correct Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.wrongAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        }
      case 'open':
        if (isCorrect) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />
              <Text style={styles.correctAnswerHeading}>
                Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.correctAnswerHeading}>Explanation:</Text>
              <Text style={styles.correctAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>
                Your Answer: {answer?.givenAnswer}
              </Text>
              <Text style={styles.wrongAnswerHeading}>
                Correct Answer: {answer?.correctAnswer}
              </Text>
              <Text style={styles.wrongAnswerHeading}>Explanation:</Text>
              <Text style={styles.wrongAnswerTxt}>
                {answer?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        }
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setIsExpanded(prev => !prev);
        setSelectedIndex(index);
      }}>
      <View
        style={
          expandView && isExpanded
            ? [
                styles.card,
                {
                  marginBottom: 0,
                  borderColor: isCorrect ? Colors.primaryLight : Colors.red,
                },
              ]
            : styles.card
        }>
        <Text
          style={
            expandView && isExpanded
              ? [
                  styles.question,
                  {color: isCorrect ? Colors.primaryLight : Colors.red},
                ]
              : styles.question
          }>
          {answer?.question}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {isCorrect ? (
            <Image
              source={Images.TickMark}
              style={{width: 30, aspectRatio: 1}}
            />
          ) : (
            <Image
              source={Images.CrossMark}
              style={{width: 30, aspectRatio: 1}}
            />
          )}
          {expandView && isExpanded ? (
            <AppIcons.ChevronUpIcon
              color={isCorrect ? Colors.primaryLight : Colors.red}
              size={20}
              disabled
            />
          ) : (
            <AppIcons.ChevronDownIcon
              color={Colors.primaryDark}
              size={20}
              disabled
            />
          )}
        </View>
      </View>
      {expandView && isExpanded && showExplanation()}
    </TouchableOpacity>
  );
};

export default DropdownQuestionSummary;
