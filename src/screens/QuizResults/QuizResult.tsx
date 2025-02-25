import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import styles from './Styles';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import DropdownQuestionSummary from '../../components/DropdownQuestionSummary/DropdownQuestionSummary';
import CustomButton from '../../components/CustomButton/CustomButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';
import {CommonActions} from '@react-navigation/native';

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
    questions: quizSummary.answers,
  };

  const questions = quizSummary.answers || [];
  const [selectedIndex, setSelectedIndex] = useState<Number>(-1);

  const goToHomeScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'DrawerNavigation',
          },
          {
            name: 'Home',
          },
        ],
      }),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader
        centerText="Quiz Results"
        leftIcon
        onBackPress={goToHomeScreen}
      />
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
          onPress={goToHomeScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuizResult;
