/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {Images} from '../../../assets/images';
import {Image} from 'react-native';
import AnswerOption from '../AnswerOption/AnswerOption';
import CustomButton from '../CustomButton/CustomButton';
import {showError, showSuccess} from '../../utils/System/MessageHandlers';
import {Question} from '../../libs/Global';
import AnswerOptionDraggable from '../AnswerOptionDraggable/AnswerOptionDraggable';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {API} from '../../services';
import {mutationHandler} from '../../services/mutations/mutationHandler';
import {moderateScale} from 'react-native-size-matters';
import queryHandler from '../../services/queries/queryHandler';
import NativeInput from '../NativeInput/NativeInput';

type Props = {
  question: Question;
  totalQuestionCount: number;
  index: number;
  displayAnswer?: boolean;
  panelType: 'quiz' | 'browse';
  handleNext?: () => void;
  setAnswers?: any;
  handleQuizSubmit?: () => void;
  setIsLoading?: (val: boolean) => void;
};
const QuestionPanel = (props: Props) => {
  const {
    question,
    totalQuestionCount,
    index,
    panelType,
    displayAnswer,
    handleNext,
    setAnswers,
    handleQuizSubmit,
    setIsLoading,
  } = props;
  const [selectedOption, setSelectedOption] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrangedAnswer, setArrangedAnswer] = useState(question?.options);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openAnswer, setOpenAnswer] = useState('');

  const {refetch, isLoading} = queryHandler(
    API.checkIsFavorite(question.id),
    (res: any) => {
      setIsFavorite(res.isFavorite);
    },
    (err: any) => {
      console.log(err);
    },
  );

  const {mutate: addToFavorite} = mutationHandler(
    API.addToFavorite,
    (res: any) => {
      showSuccess(res?.message || 'Question added to favorites');
      refetch();
    },
    (err: any) => {
      console.log(err);
    },
  );

  const {mutate: removeFromFavorite} = mutationHandler(
    API.removeFromFavorite(question.id),
    (res: any) => {
      showSuccess(res?.message || 'Question removed from favorites');
      refetch();
    },
    (err: any) => {
      showError('Error removing from favorites');
      console.log(err);
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (panelType === 'browse' || displayAnswer) {
      switch (question?.type) {
        case 'choices':
          setSelectedOption(question.options.indexOf(question?.correctAnswer));
          break;
        case 'order':
          setArrangedAnswer(
            question?.correctAnswer
              ?.toString()
              .split(',')
              .map(item => item.trim()),
          );
      }
      setIsSubmitted(true);
    }
  }, []);

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

  const checkIfCorrect = () => {
    switch (question?.type) {
      case 'choices':
        return {
          isCorrect:
            question?.correctAnswer === question?.options[selectedOption],
          userOrderLetters: null, // Not applicable for 'choices' type
        };

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
          if (choice !== '') {
            return choiceMap[choice]; // Map the choice to its corresponding letter
          }
        });

        // Compare the user's order with the correct order
        const isCorrect = correctOrder.every(
          (letter, index) => letter === userOrderLetters[index],
        );

        return {isCorrect, userOrderLetters};
      }
      case 'open':
        const isCorrect =
          openAnswer.trim() === question?.correctAnswer?.toString().trim();
        return {isCorrect, userOrderLetters: null};
      default:
        return {isCorrect: false, userOrderLetters: null};
    }
  };

  const handleSubmit = () => {
    switch (question?.type) {
      case 'choices':
        if (selectedOption === -1) {
          showError('Please select a valid option');
          return;
        }
        break;

      case 'order':
        const filteredArrangedAnswer = arrangedAnswer.filter(
          answer => answer !== '',
        );
        if (
          filteredArrangedAnswer.length !==
          question?.options.filter(option => option !== '').length
        ) {
          showError('Please order all the options');
          return;
        }
        console.log('arranged: ', filteredArrangedAnswer);
        break;
      case 'open':
        if (openAnswer === '') {
          showError('Please enter your answer first');
        }
        break;
      default:
        break;
    }

    // Get the result from checkIfCorrect
    const {isCorrect, userOrderLetters} = checkIfCorrect();

    // Create the answer object
    const answer = {
      ...question,
      givenAnswer:
        question?.type === 'choices'
          ? question.options[selectedOption]
          : question?.type === 'open'
          ? openAnswer.trim()
          : userOrderLetters?.join(' '), // Use userOrderLetters for 'order' type
      isCorrect,
    };

    // Update the answers state
    setAnswers(prevAnswers => [...prevAnswers, answer]);
    setIsSubmitted(true);
  };

  const showExplanation = () => {
    switch (question?.type) {
      case 'choices':
        if (question?.correctAnswer === question?.options[selectedOption]) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />

              <Text style={styles.correctAnswerHeading}>Correct</Text>
              <Text style={styles.correctAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>Wrong</Text>
              <Text style={styles.wrongAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
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
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />
              <Text style={styles.correctAnswerHeading}>Correct</Text>
              <Text style={styles.correctAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>Wrong</Text>
              <Text style={styles.wrongAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        }
      }
      case 'open':
        if (question?.correctAnswer.toString().trim() === openAnswer.trim()) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />

              <Text style={styles.correctAnswerHeading}>Correct</Text>
              <Text style={styles.correctAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>Wrong</Text>
              <Text style={styles.wrongAnswerTxt}>
                {question?.explanation === ''
                  ? 'No explanation available'
                  : question?.explanation}
              </Text>
            </View>
          );
        }
    }
  };

  const conditionalFormatting = (chosenBtnIndex: number) => {
    if (isSubmitted || displayAnswer) {
      return selectedOption === chosenBtnIndex
        ? question?.correctAnswer === question?.options[selectedOption]
          ? Colors.darkGreen
          : Colors.red
        : Colors.primaryDark;
    } else {
      return selectedOption === chosenBtnIndex
        ? Colors.primaryLight
        : Colors?.primaryDark;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Heading Container */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingLabel}>Question</Text>
        <View style={styles.rowContainer}>
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
            style={styles.questionIcon}
          />
        </View>
      </View>

      {/* Question Container */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question?.question}</Text>
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
      {/* Option Container */}
      {question?.type === 'choices' && (
        <View style={styles.optionsContainer}>
          {question?.options?.map((option, index) => {
            if (option === '') return null;
            return (
              <AnswerOption
                key={index}
                index={index}
                data={option}
                disabled={
                  panelType === 'quiz'
                    ? isSubmitted
                    : panelType === 'browse' || displayAnswer
                }
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
        <View style={styles.optionsContainer}>
          <DraggableFlatList
            data={arrangedAnswer}
            onDragEnd={({data}) => setArrangedAnswer(data)}
            keyExtractor={item => item.toString()}
            renderItem={({item, drag, isActive}) => {
              if (item === '') return null;
              return (
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <ScaleDecorator>
                    <AnswerOptionDraggable
                      data={item}
                      drag={drag}
                      isActive={
                        panelType === 'quiz' && !displayAnswer && !isSubmitted
                          ? isActive
                          : true
                      }
                      customStyle={{
                        borderColor:
                          panelType === 'browse'
                            ? Colors.darkGreen
                            : conditionalFormatting(index),
                        color:
                          panelType === 'browse'
                            ? Colors.darkGreen
                            : conditionalFormatting(index),
                      }}
                    />
                  </ScaleDecorator>
                </View>
              );
            }}
          />
        </View>
      )}

      {question?.type === 'open' && (
        <View style={styles.optionsContainer}>
          <NativeInput
            value={openAnswer}
            placeholder={'Please enter your answer here'}
            onChangeText={(text: string) => setOpenAnswer(text)}
            secureTextEntry={false}
            editable={!isSubmitted}
            customContainerStyles={
              isSubmitted
                ? {
                    borderColor:
                      openAnswer.trim() ===
                      question?.correctAnswer?.toString().trim()
                        ? Colors.darkGreen
                        : Colors.red,
                  }
                : undefined
            }
            customInputStyles={
              isSubmitted
                ? {
                    color:
                      openAnswer.trim() ===
                      question?.correctAnswer?.toString().trim()
                        ? Colors.darkGreen
                        : Colors.red,
                  }
                : undefined
            }
          />
        </View>
      )}

      {/* Count Indicator */}
      <Text style={styles.count}>
        {index + 1} / {totalQuestionCount}
      </Text>

      {(isSubmitted || displayAnswer) && showExplanation()}

      {panelType === 'quiz' && !displayAnswer && (
        <>
          {!isSubmitted ? (
            <CustomButton
              label={'Submit'}
              onPress={handleSubmit}
              containerStyle={styles.submitBtn}
            />
          ) : (
            <CustomButton
              label={index + 1 === totalQuestionCount ? 'Submit' : 'Next'}
              onPress={
                index + 1 === totalQuestionCount ? handleQuizSubmit : handleNext
              }
              containerStyle={styles.nextBtn}
            />
          )}
        </>
      )}
      <View style={{marginBottom: 100}} />
      {/* <LoaderModal visible={isLoading} /> */}
    </ScrollView>
  );
};

export default QuestionPanel;
