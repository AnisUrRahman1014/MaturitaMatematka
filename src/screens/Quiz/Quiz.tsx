/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import {Question} from '../../libs/Global';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootStackList} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackHandler} from 'react-native';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import Routes from '../../navigation/Routes';
import {mutationHandler} from '../../services/mutations/mutationHandler';
import {API} from '../../services';
import {showError} from '../../utils/System/MessageHandlers';

const {width} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'Quiz'>;
  route: any;
};
const Quiz = (props: Props) => {
  const navigation = props.navigation;
  const panelType = props?.route?.params?.panelType;
  const quizQuestions = props?.route?.params?.quizQuestions;

  const flatListRef = useRef(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions = quizQuestions || [];

  const [answers, setAnswers] = useState([]);

  const {mutate: submitQuizMutate, isLoading: mutateLoading} = mutationHandler(
    API.submitQuiz,
    res => {
      console.log('here');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: Routes.Home
            },
            {
              name: Routes.QuizResult,
              params: {
                quizSummary: res.summary,
              },
            },
          ],
        }),
      );
      // navigation.navigate(Routes.QuizResult, {
      //   quizSummary: res.summary,
      // });
    },
    error => {
      showError('Error submitting quiz: '.concat(error.message));
    },
  );

  // Handle hardware back button press
  useEffect(() => {
    const backAction = () => {
      restrictBack(); // Trigger your exit confirmation logic
      return true; // Prevent default back behavior
    };

    // Add event listener for hardware back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  // Handle swipe gestures (iOS)
  useFocusEffect(
    React.useCallback(() => {
      const onBlur = () => {
        restrictBack(); // Trigger your exit confirmation logic
      };

      // Add a listener for screen blur (when the user swipes back)
      const unsubscribe = navigation.addListener('blur', onBlur);

      // Clean up the listener
      return () => unsubscribe();
    }, [props.navigation]),
  );

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const restrictBack = () => {
    Alert.alert('Caution', 'If you go back, your progress will be wasted!', [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Exit',
        onPress: () => {
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        category: answers[0].category,
        answers,
      };

      submitQuizMutate({quizContent: data});
    } catch (error) {
      showError('Error uploading quiz '.concat(error.message));
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Quiz" onBackPress={restrictBack} />
      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => {
          //   console.log(item);
          // if (index > 5) return null;
          return (
            <>
              <QuestionPanel
                question={item}
                totalQuestionCount={questions?.length}
                index={index}
                panelType={panelType}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                setAnswers={setAnswers}
                handleQuizSubmit={handleSubmit}
              />
              {panelType !== 'quiz' && (
                <View
                  style={{
                    ...styles.navBtnsContainer,
                    justifyContent:
                      index === 0
                        ? 'flex-end'
                        : index === questions?.length - 1
                        ? 'flex-start'
                        : 'space-between',
                  }}>
                  {panelType !== 'quiz' && index !== 0 && (
                    <AppIcons.ChevronLeftIcon
                      size={30}
                      onPress={handlePrevious}
                      color={Colors.primaryDark}
                    />
                  )}
                  {panelType !== 'quiz' && index !== questions?.length - 1 && (
                    <AppIcons.ChevronRightIcon
                      size={30}
                      onPress={handleNext}
                      color={Colors.primaryDark}
                    />
                  )}
                </View>
              )}
            </>
          );
        }}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        initialNumToRender={5} // Number of items to render initially
        maxToRenderPerBatch={5} // Number of items to render per batch
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: width, // Assuming each question panel is full screen width
          offset: width * index,
          index,
        })}
      />
      <LoaderModal visible={mutateLoading} />
    </SafeAreaView>
  );
};

export default Quiz;
