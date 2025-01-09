import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {Images} from '../../../assets/images';
import {Image} from 'react-native';
import AnswerOption from '../AnswerOption/AnswerOption';
import CustomButton from '../CustomButton/CustomButton';
import {showError} from '../../utils/System/MessageHandlers';
import {Answer, Question} from '../../libs/Global';
import AnswerOptionDraggable from '../AnswerOptionDraggable/AnswerOptionDraggable';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import styless from './Styles';

type Props = {
  question: Answer;
  totalQuestionCount: number;
  index: number;
  displayAnswer: boolean;
  panelType: 'quiz' | 'browse';
  quizResult: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
};
const QuizResultQuestionPanel = (props: Props) => {
  const {
    question,
    totalQuestionCount,
    index,
    panelType = 'browse',
    displayAnswer,
    quizResult,
    handleNext,
    handlePrevious,
  } = props;
  const [selectedOption, setSelectedOption] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrangedAnswer, setArrangedAnswer] = useState(question?.options);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (panelType === 'browse' || displayAnswer) {
      switch (question?.type) {
        case 'simple':
          setSelectedOption(question.options.indexOf(question?.correctAnswer));
        case 'arrange':
          setArrangedAnswer(
            question?.correctAnswer?.split(',').map(item => item.trim()),
          );
          if (question?.correctAnswer === arrangedAnswer.toString()) {
          }
      }
      setIsSubmitted(true);
    }
  }, []);

  const handleFavorite = () => {
    // CHECK IF THIS IS IN FAVORITISED IN DB OR NOT
  };

  const handleSubmit = () => {
    switch (question?.type) {
      case 'simple':
        if (selectedOption === -1) {
          showError('Please select a valid option');
          return;
        }
        break;
      case 'arrange':
        if (arrangedAnswer.length !== question?.options.length) {
          showError('Please arrange all the options');
          return;
        }
        console.log('arranged: ', arrangedAnswer);
        break;
    }
    setIsSubmitted(true);
  };

  const handleNextButton = () => {
    setIsSubmitted(false);
  };

  const showExplanation = () => {
    switch (question?.type) {
      case 'simple':
        if (question?.correctAnswer === question?.givenAnswer) {
          return (
            <View style={styless.correctAnswer}>
              <View style={styless.correctAnswerBG} />

              <Text style={styless.correctAnswerHeading}>Correct</Text>
              <Text style={styless.correctAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styless.wrongAnswer}>
              <View style={styless.wrongAnswerBG} />
              <Text style={styless.wrongAnswerHeading}>Wrong</Text>
              <Text style={styless.wrongAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        }
      case 'arrange':
        if (question?.correctAnswer === question?.givenAnswer) {
          return (
            <View style={styless.correctAnswer}>
              <View style={styless.correctAnswerBG} />

              <Text style={styless.correctAnswerHeading}>Correct</Text>
              <Text style={styless.correctAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styless.wrongAnswer}>
              <View style={styless.wrongAnswerBG} />
              <Text style={styless.wrongAnswerHeading}>Wrong</Text>
              <Text style={styless.wrongAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        }
    }
  };

  const conditionalFormatting = (chosenBtnIndex: number) => {
    if (isSubmitted || displayAnswer) {
      if (quizResult) {
        return question?.givenAnswer === question?.correctAnswer
          ? chosenBtnIndex === question?.options?.indexOf(question?.givenAnswer)
            ? Colors.darkGreen // Correct answer highlighted in green
            : Colors.primaryDark // Other options remain dark
          : chosenBtnIndex === question?.options?.indexOf(question?.givenAnswer)
          ? Colors.red // Highlight the given wrong answer in red
          : chosenBtnIndex ===
            question?.options?.indexOf(question?.correctAnswer)
          ? Colors.darkGreen // Highlight the correct answer in green
          : Colors.primaryDark; // Other options remain dark
      } else {
        return selectedOption === chosenBtnIndex
          ? question?.correctAnswer === question?.options[selectedOption]
            ? Colors.darkGreen
            : Colors.red
          : Colors.primaryDark;
      }
    } else {
      return selectedOption === chosenBtnIndex
        ? Colors.primaryLight
        : Colors?.primaryDark;
    }
  };

  return (
    <ScrollView
      style={styless.container}
      contentContainerStyle={{paddingBottom: 50}}>
      {/* Heading Container */}
      <View style={styless.headingContainer}>
        <Text style={styless.headingLabel}>Question</Text>
        <View style={styless.rowContainer}>
          <AppIcons.FavoriteIcon size={24} color={Colors?.primaryDark} />
          <Image
            source={Images?.QuestionMark}
            resizeMode="contain"
            style={styless.questionIcon}
          />
        </View>
      </View>

      {/* Question Container */}
      <View style={styless.questionContainer}>
        <Text style={styless.question}>{question?.question}</Text>
      </View>
      {question.type !== 'simple' && (
        <Text style={styless.subHeading}>Correct Answer</Text>
      )}
      {/* Option Container */}
      {question?.type === 'simple' && (
        <View style={styless.optionsContainer}>
          {question?.options?.map((option, index) => {
            return (
              <AnswerOption
                index={index}
                data={option}
                disabled={panelType === 'browse' || displayAnswer}
                setSelectedOption={
                  panelType === 'browse' ? () => {} : setSelectedOption
                }
                customStyle={{
                  borderColor: conditionalFormatting(index),
                  color: conditionalFormatting(index),
                }}
              />
            );
          })}
        </View>
      )}

      {question?.type === 'arrange' && (
        <View style={styless.optionsContainer}>
          <AnswerOption
            index={index}
            data={question?.correctAnswer}
            disabled={panelType === 'browse' || displayAnswer}
            setSelectedOption={
              panelType === 'browse' ? () => {} : setSelectedOption
            }
            customStyle={{
              borderColor: Colors.primaryLight,
              color: Colors.primaryDark,
            }}
          />
        </View>
      )}

      {quizResult && question?.type === 'arrange' && (
        <>
          <Text style={styless.subHeading}>Your Answer</Text>
          <View style={styless.optionsContainer}>
            <AnswerOption
              index={index}
              data={question?.givenAnswer}
              disabled={panelType === 'browse' || displayAnswer}
              setSelectedOption={
                panelType === 'browse' ? () => {} : setSelectedOption
              }
              customStyle={{
                borderColor:
                  question?.correctAnswer === question?.givenAnswer?.toString()
                    ? Colors.darkGreen
                    : Colors.red,
                color:
                  question?.correctAnswer === question?.givenAnswer?.toString()
                    ? Colors.darkGreen
                    : Colors.red,
              }}
            />
          </View>
        </>
      )}

      {/* Count Indicator */}
      <Text style={styless.count}>
        {index + 1} / {totalQuestionCount}
      </Text>

      {(isSubmitted || displayAnswer) && showExplanation()}

      {panelType === 'quiz' && !displayAnswer && (
        <>
          {!isSubmitted ? (
            <CustomButton
              label={'Submit'}
              onPress={handleSubmit}
              containerStyle={{marginTop: '15%'}}
            />
          ) : (
            <CustomButton
              label={'Next'}
              onPress={handleNextButton}
              containerStyle={{
                backgroundColor: Colors.primaryLight,
                marginTop: '15%',
              }}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default QuizResultQuestionPanel;
