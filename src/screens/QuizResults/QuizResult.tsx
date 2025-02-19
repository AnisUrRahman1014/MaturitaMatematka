import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import styles from './Styles';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import {Answer, Question} from '../../libs/Global';
import DropdownQuestionSummary from '../../components/DropdownQuestionSummary/DropdownQuestionSummary';
import CustomButton from '../../components/CustomButton/CustomButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'QuizResult'>;
};
const QuizResult = ({navigation}: Props) => {
  const dummyData = {
    category: 'Planimetry',
    correctAnswerCount: 10,
    incorrectAnswerCount: 5,
    totalQuestions: 20,
    score: 80,
  };

  const [questions, setQuestions] = useState<Answer[]>([
    {
      id: '1',
      type: 'simple',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      givenAnswer: '25 cm²',
      isCorrect: true,
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: '2',
      type: 'order',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²,15 cm²,50 cm²,30 cm²',
      givenAnswer: '15 cm²,30 cm²,50 cm²,30 cm²',
      isCorrect: false,
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: '3',
      type: 'simple',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      givenAnswer: '30 cm²',
      isCorrect: false,
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: '4',
      type: 'simple',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      givenAnswer: '25 cm²',
      isCorrect: true,
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState<Number>(-1);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader centerText="Quiz Results" leftIcon />
      <View style={styles.mainContainer}>
        <SummaryCard data={dummyData} />
        <FlatList
          data={questions}
          renderItem={({item, index}) => {
            return (
              <DropdownQuestionSummary
                answer={item}
                key={index}
                setSelectedIndex={setSelectedIndex}
                index={index}
                expandView={index === selectedIndex}
              />
            );
          }}
          contentContainerStyle={styles.questionsContainer}
        />
        <CustomButton
          label={'Done'}
          containerStyle={styles.btn}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuizResult;
