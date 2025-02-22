import {View, Text, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import {Question} from '../../libs/Global';
import NavHeader from '../../components/NavHeader/NavHeader';
import LoaderModal from '../../components/LoaderModal/LoaderModal';

type Props = {
  route: any;
};
const AnswerDisplayScreen = ({route}: Props) => {
  const question: Question = route.params.question;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Details" />
      <QuestionPanel
        displayAnswer
        question={question}
        totalQuestionCount={0}
        index={0}
        panelType={'browse'}
        setIsLoading={setIsLoading}
      />
      <LoaderModal visible={isLoading}/>
    </SafeAreaView>
  );
};

export default AnswerDisplayScreen;
