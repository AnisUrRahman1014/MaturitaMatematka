import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {Images} from '../../../assets/images';
import {Image} from 'react-native';
import AnswerOption from '../AnswerOption/AnswerOption';
import CustomButton from '../CustomButton/CustomButton';
import {showError} from '../../utils/System/MessageHandlers';
import {Question} from '../../libs/Global';
import AnswerOptionDraggable from '../AnswerOptionDraggable/AnswerOptionDraggable';
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
} from 'react-native-draggable-flatlist';

type Props = {
  question: Question;
  totalQuestionCount: number;
  index: number;
};
const QuestionPanel = (props: Props) => {
  const {question, totalQuestionCount, index} = props;
  const [selectedOption, setSelectedOption] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrangedAnswer, setArrangedAnswer] = useState(question?.options);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleNext = () => {
    setIsSubmitted(false);
  };

  const showExplanation = () => {
    console.log(question?.options[selectedOption]);
    switch (question?.type) {
      case 'simple':
        if (question?.correctAnswer === question?.options[selectedOption]) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />

              <Text style={styles.correctAnswerHeading}>Correct</Text>
              <Text style={styles.correctAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>Wrong</Text>
              <Text style={styles.wrongAnswerTxt}>{question?.explanation}</Text>
            </View>
          );
        }
      case 'arrange':
        if (question?.correctAnswer === arrangedAnswer.toString()) {
          return (
            <View style={styles.correctAnswer}>
              <View style={styles.correctAnswerBG} />

              <Text style={styles.correctAnswerHeading}>Correct</Text>
              <Text style={styles.correctAnswerTxt}>
                {question?.explanation}
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.wrongAnswer}>
              <View style={styles.wrongAnswerBG} />
              <Text style={styles.wrongAnswerHeading}>Wrong</Text>
              <Text style={styles.wrongAnswerTxt}>{question?.explanation}</Text>
            </View>
          );
        }
    }
  };

  const conditionalFormatting = (chosenBtnIndex: number) => {
    if (isSubmitted) {
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
          <AppIcons.FavoriteIcon size={24} color={Colors?.primaryDark} />
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
      </View>

      {/* Option Container */}
      {question?.type === 'simple' && (
        <View style={styles.optionsContainer}>
          {question?.options?.map((option, index) => {
            return (
              <AnswerOption
                index={index}
                data={option}
                setSelectedOption={setSelectedOption}
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
        <View style={styles.optionsContainer}>
          <DraggableFlatList
            data={arrangedAnswer}
            onDragEnd={({data}) => setArrangedAnswer(data)}
            keyExtractor={item => item.toString()}
            renderItem={({item, drag, isActive}) => {
              return (
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <ScaleDecorator>
                    <AnswerOptionDraggable
                      data={item}
                      drag={drag}
                      isActive={isActive}
                      setSelectedOption={setSelectedOption}
                      customStyle={{
                        borderColor: conditionalFormatting(index),
                        color: conditionalFormatting(index),
                      }}
                    />
                  </ScaleDecorator>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* Count Indicator */}
      <Text style={styles.count}>
        {index + 1} / {totalQuestionCount}
      </Text>

      {isSubmitted && showExplanation()}

      <View style={styles.submitBtn}>
        {!isSubmitted ? (
          <CustomButton label={'Submit'} onPress={handleSubmit} />
        ) : (
          <CustomButton
            label={'Next'}
            onPress={handleNext}
            containerStyle={{backgroundColor: Colors.primaryLight}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default QuestionPanel;
