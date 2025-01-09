import {SafeAreaView, FlatList, Dimensions, Animated, View} from 'react-native';
import React, {useRef, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import {Answer, Question, QuizResultData} from '../../libs/Global';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import QuizResultQuestionPanel from '../../components/QuizResultQuestionPanel/QuizResultQuestionPanel';

const {width} = Dimensions.get('window');

type Props = {
  route: any;
  quiz: QuizResultData;
};
const QuizDetail = (props: Props) => {
  const panelType = props?.route?.params?.panelType;
  const {quiz} = props?.route?.params;

  const flatListRef = useRef(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Answer[]>(quiz.questions);

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
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Quiz" />
      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => {
          //   console.log(item);
          return (
            <>
              <QuizResultQuestionPanel
                key={index}
                question={item}
                totalQuestionCount={questions?.length}
                index={index}
                panelType={panelType}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                quizResult
              />
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
      />
    </SafeAreaView>
  );
};

export default QuizDetail;
