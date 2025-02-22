import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {Images} from '../../../assets/images';
import {Image} from 'react-native';
import AnswerOption from '../AnswerOption/AnswerOption';
import CustomButton from '../CustomButton/CustomButton';
import {showError, showSuccess} from '../../utils/System/MessageHandlers';
import {Answer, Question} from '../../libs/Global';
import AnswerOptionDraggable from '../AnswerOptionDraggable/AnswerOptionDraggable';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import styless from './Styles';
import {moderateScale} from 'react-native-size-matters';
import {API} from '../../services';
import {mutationHandler} from '../../services/mutations/mutationHandler';
import queryHandler from '../../services/queries/queryHandler';

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

  const {refetch, isLoading} = queryHandler(
    API.checkIsFavorite(question.id),
    res => {
      setIsFavorite(res.isFavorite);
    },
    err => {
      console.log(err);
    },
  );

  const {mutate: addToFavorite} = mutationHandler(
    API.addToFavorite,
    res => {
      showSuccess(res?.message || 'Question added to favorites');
      refetch();
    },
    err => {
      console.log(err);
    },
  );

  const {mutate: removeFromFavorite} = mutationHandler(
    API.removeFromFavorite(question.id),
    res => {
      showSuccess(res?.message || 'Question removed from favorites');
      refetch();
    },
    err => {
      console.log(err);
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (panelType === 'browse' || displayAnswer) {
      switch (question?.type) {
        case 'choices':
          setSelectedOption(question.options.indexOf(question?.correctAnswer));
          break;
        case 'order':
          setArrangedAnswer(question?.correctAnswer);
          break;
      }
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    switch (question?.type) {
      case 'choices':
        if (selectedOption === -1) {
          showError('Please select a valid option');
          return;
        }
        break;
      case 'order':
        if (arrangedAnswer.length !== question?.options.length) {
          showError('Please order all the options');
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
      case 'choices':
        if (question?.correctAnswer === question?.givenAnswer) {
          return (
            <View style={styless.correctAnswer}>
              <View style={styless.correctAnswerBG} />

              <Text style={styless.correctAnswerHeading}>Correct</Text>
              <Text style={styless.correctAnswerTxt}>
                {question?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styless.wrongAnswer}>
              <View style={styless.wrongAnswerBG} />
              <Text style={styless.wrongAnswerHeading}>Wrong</Text>
              <Text style={styless.wrongAnswerTxt}>
                {question?.explanation || 'No explanation available'}
              </Text>
            </View>
          );
        }
      case 'order': {
        // Convert the correctAnswer string into an array of letters
        const correctOrder = question?.correctAnswer?.split(' ') || []; // e.g., ["B", "A", "F", "D"]

        // Convert the user's arranged answer into an array of choices
        const userOrder = arrangedAnswer?.toString().split(',');
        const filteredUserOrder = userOrder.filter(choice => choice !== '');

        // Dynamically create the choiceMap based on the question's options, excluding empty strings
        const choiceMap = {};
        let letterIndex = 0; // Track the index for assigning letters (A, B, C, etc.)

        question.options.forEach(option => {
          if (option !== '') {
            const letter = String.fromCharCode(65 + letterIndex); // 65 is ASCII for 'A'
            choiceMap[option] = letter; // e.g., { "(0; +∞)": "A", "(2; +∞)": "B", ... }
            letterIndex++; // Increment the letter index only for non-empty options
          }
        });
        // Convert the user's answer to letters using the dynamic choiceMap
        const userOrderLetters = filteredUserOrder.map(choice => {
          console.log(choice);
          if (choice !== '') {
            return choiceMap[choice]; // Map the choice to its corresponding letter
          }
        });

        // Compare the user's order with the correct order
        const isCorrect = correctOrder.every(
          (letter, index) => letter === userOrderLetters[index],
        );

        if (isCorrect) {
          return (
            <View style={styless.correctAnswer}>
              <View style={styless.correctAnswerBG} />
              <Text style={styless.correctAnswerHeading}>Correct</Text>
              <Text style={styless.correctAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styless.wrongAnswer}>
              <View style={styless.wrongAnswerBG} />
              <Text style={styless.wrongAnswerHeading}>Wrong</Text>
              <Text style={styless.wrongAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        }
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

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        removeFromFavorite(undefined);
      } else {
        const payload = {
          categoryName: question.category,
          questionId: question.id,
        };
        addToFavorite(payload);
      }
    } catch (error) {
      console.log('Error in favorite: ', error);
    }
  };

  return (
    <ScrollView
      style={styless.container}
      contentContainerStyle={{paddingBottom: moderateScale(100)}}>
      {/* Heading Container */}
      <View style={styless.headingContainer}>
        <Text style={styless.headingLabel}>Question</Text>
        <View style={styless.rowContainer}>
          {isFavorite ? (
            <AppIcons.HeartIcon
              size={moderateScale(28)}
              color={Colors?.primaryLight}
              onPress={handleFavorite}
            />
          ) : (
            <AppIcons.HeartIconOutline
              size={moderateScale(28)}
              color={Colors?.primaryDark}
              onPress={handleFavorite}
            />
          )}
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
        {question?.imageURL && (
          <Image
            source={{uri: question?.imageURL}}
            resizeMode="contain"
            style={{
              width: '100%',
              height: moderateScale(200),
              marginTop: moderateScale(15),
            }}
          />
        )}
      </View>
      {question.type !== 'choices' && (
        <Text style={styless.subHeading}>Correct Answer</Text>
      )}
      {/* Option Container */}
      {question?.type === 'choices' && (
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

      {question?.type === 'order' && (
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

      {quizResult && question?.type === 'order' && (
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

      {/* {panelType === 'quiz' && !displayAnswer && (
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
      )} */}
    </ScrollView>
  );
};

export default QuizResultQuestionPanel;
