import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import {Images} from '../../../assets/images';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';

type Question = {
  question: string;
  correctAnswer: string;
  explanation: string;
  options: string[];
};

const {width} = Dimensions.get('window');
const Quiz = () => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: 2,
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: 3,
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: 3,
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Quiz" />
      <FlatList
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => {
          //   console.log(item);
          return (
            <QuestionPanel
              question={item}
              totalQuestionCount={questions?.length}
              index={index}
            />
          );
        }}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Quiz;
