/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, FlatList, Dimensions, Animated, View, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import {Answer, QuizResultData} from '../../libs/Global';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import QuizResultQuestionPanel from '../../components/QuizResultQuestionPanel/QuizResultQuestionPanel';
import {moderateScale} from 'react-native-size-matters';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackList } from '../../navigation/types';


const {width} = Dimensions.get('window');

type Props = {
  route: any;
  quiz: QuizResultData;
  navigation: NativeStackNavigationProp<RootStackList, 'QuizDetail'>
};
const QuizDetail = (props: Props) => {
  const panelType = props?.route?.params?.panelType;
  const {quiz} = props?.route?.params;

  const flatListRef = useRef(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions = quiz || []

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
                      size={moderateScale(30)}
                      onPress={handlePrevious}
                      color={Colors.primaryDark}
                    />
                  )}
                  {panelType !== 'quiz' && index !== questions?.length - 1 && (
                    <AppIcons.ChevronRightIcon
                      size={moderateScale(30)}
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
    </SafeAreaView>
  );
};

export default QuizDetail;
