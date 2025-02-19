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
  route: any;
};
const QuizResult = ({navigation, route}: Props) => {
  const quizSummary = route?.params?.quizSummary;
  const summary = {
    category: quizSummary.category,
    correctAnswerCount: quizSummary.correctAnswers,
    incorrectAnswerCount: 5,
    totalQuestions: quizSummary.totalQuestions,
    score: 80,
    rating: quizSummary.rating,
    badge: quizSummary.badge,
    date: quizSummary.date,
    questions: quizSummary.answers
  };

  const questions = quizSummary.answers || []
  const [selectedIndex, setSelectedIndex] = useState<Number>(-1);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader centerText="Quiz Results" leftIcon />
      <View style={styles.mainContainer}>
        <SummaryCard data={summary} />
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
