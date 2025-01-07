import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import {Question} from '../../libs/Global';
import NavHeader from '../../components/NavHeader/NavHeader';

type Props = {
  route: any;
};
const AnswerDisplayScreen = ({route}: Props) => {
  const question: Question = route.params.question;
  console.log(question);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Details" />
      <QuestionPanel
        displayAnswer
        question={question}
        totalQuestionCount={0}
        index={0}
        panelType={'quiz'}
        handleNext={function (): void {
          throw new Error('Function not implemented.');
        }}
        handlePrevious={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </SafeAreaView>
  );
};

export default AnswerDisplayScreen;
