import {SafeAreaView, FlatList, Dimensions, Animated, View} from 'react-native';
import React, {useRef, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import {Question} from '../../libs/Global';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('window');

type Props = {
  route: any;
};
const Quiz = (props: Props) => {
  const panelType = props?.route?.params?.panelType;

  const flatListRef = useRef(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'simple',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
    },
    {
      id: '2',
      type: 'arrange',
      question:
        'What is the area of a triangle with a base of 10 cm and a height of 5 cm?',
      options: ['25 cm²', '30 cm²', '50 cm²', '15 cm²'],
      correctAnswer: '25 cm²,15 cm²,50 cm²,30 cm²',
      explanation:
        'The area of a triangle is calculated using the formula Area=1 / 2 × base × height  = 21 ​× base × height. So, 1/2 × 10 cm × 5 cm = 25 cm',
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
    },
  ]);

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
              <QuestionPanel
                question={item}
                totalQuestionCount={questions?.length}
                index={index}
                panelType={panelType}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
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
                {index !== 0 && (
                  <AppIcons.ChevronLeftIcon
                    size={30}
                    onPress={handlePrevious}
                    color={Colors.primaryDark}
                  />
                )}
                {index !== questions?.length - 1 && (
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

export default Quiz;
