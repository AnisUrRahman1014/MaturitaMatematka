import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import styles from './Styles';
import PerformanceIndicator from '../../../components/PerformanceIndicator/PerformanceIndicator';
import AppIcons from '../../../libs/NativeIcons';
import {AppConstants, Colors} from '../../../utils/System/Constants';
import {formattedDate, QuizResultData, section} from '../../../libs/Global';
import QuizCard from '../../../components/QuizCard/QuizCard';
import {Animated} from 'react-native';
import queryHandler from '../../../services/queries/queryHandler';
import {API} from '../../../services';
import {showError} from '../../../utils/System/MessageHandlers';

const {width} = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

const HistoryScreen = () => {
  const [sorting, setSorting] = useState(false);
  const [summary, setSummary] = useState({});
  const [quizzes, setQuizzes] = useState<QuizResultData[]>([
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [
        {
          id: '1',
          type: 'simple',
          question:
            'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
          options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
          correctAnswer: '25 cm²',
          explanation:
            'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
          givenAnswer: '25 cm²',
          isCorrect: false,
        },
        {
          id: '2',
          type: 'order',
          question:
            'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
          options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
          correctAnswer: '25 cm²,15 cm²,50 cm²,30 cm²',
          explanation:
            'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
          givenAnswer: '30 cm²,25 cm²,15 cm²,50 cm²,',
          isCorrect: false,
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
          givenAnswer: '30 cm²',
          isCorrect: false,
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
          givenAnswer: '',
          isCorrect: false,
        },
      ],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
    {
      category: 'Planimetry',
      correctAnswerCount: 7,
      incorrectAnswerCount: 3,
      totalQuestions: 10,
      score: 70,
      questions: [],
      date: formattedDate(new Date(Date.now())),
    },
  ]);

  const onSuccess = res => {
    if (res.success) {
      setQuizzes(res.quizes);
      setSummary(res.data)
    }
  };

  const onError = error => {
    console.log(error);
    showError('Failed to get quiz history: '.concat(error.message));
  };

  const {refetch, isLoading} = queryHandler(
    API.getQuizHistory,
    onSuccess,
    onError,
  );

  useEffect(() => {
    refetch();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;
  const offset = headerHeight - headerFinalHeight;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
    extrapolate: 'clamp',
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: 'clamp',
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: 'clamp',
  });

  const header = () => (
    <Animated.View
      style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
      <Animated.View
        style={[
          styles.image,
          {
            transform: [
              {translateY: translateImageY},
              {translateX: translateImageX},
              {scale: scaleImage},
            ],
          },
        ]}>
        <PerformanceIndicator data={summary}/>
        <TouchableOpacity
          style={[section(0, 'row'), styles.sortCtn]}
          onPress={() => setSorting(prev => !prev)}>
          {sorting ? (
            <AppIcons.SortAscending
              size={20}
              color={Colors.primaryDark}
              disabled
            />
          ) : (
            <AppIcons.SortDescending
              size={20}
              color={Colors.primaryDark}
              disabled
            />
          )}
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader centerText="History" leftIcon />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>
          View all the previously attempted quizzes here.
        </Text>

        <FlatList
          data={quizzes}
          stickyHeaderIndices={[0]}
          StickyHeaderComponent={header}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return <QuizCard quiz={item} key={index} />;
          }}
          style={{
            marginVertical: AppConstants.ContainerPaddings.max,
            height: '90%',
          }}
          contentContainerStyle={{
            paddingVertical: AppConstants.ContainerPaddings.avg,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
