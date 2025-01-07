import {View, Text, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import {SafeAreaView} from 'react-native';
import styles from './Styles';
import {Images} from '../../../../assets/images';
import {Question, section} from '../../../libs/Global';
import QuestionCard from '../../../components/QuestionCard/QuestionCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';
import Routes from '../../../navigation/Routes';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackList,
    'IncorrectAnswersScreen'
  >;
};
const IncorrectAnswersScreen = ({navigation}: Props) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'simple',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: '2',
      type: 'arrange',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²,15 cm²,50 cm²,30 cm²',
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
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
  ]); // TODO: replace with actual data

  return (
    <SafeAreaView>
      <NavHeader centerText="Incorrect Answers" leftIcon />
      <View style={styles.mainContainer}>
        <View style={[section(0, 'row'), styles.rowCtn]}>
          <Image
            source={Images.CategoryIcon}
            style={styles.categoryIcon}
            resizeMode="contain"
          />
          <Text style={styles.pgHeading}>Incorrectly Answered Questions</Text>
        </View>

        <FlatList
          data={questions}
          renderItem={({item, index}) => {
            return (
              <QuestionCard
                question={item}
                index={index}
                key={index}
                onPress={() =>
                  navigation.navigate(Routes.AnswerDisplayScreen, {
                    question: item,
                  })
                }
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default IncorrectAnswersScreen;
