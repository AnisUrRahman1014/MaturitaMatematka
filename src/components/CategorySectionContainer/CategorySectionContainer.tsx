import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import {moderateScale} from 'react-native-size-matters';
import { Answer } from '../../libs/Global';

const CategorySectionContainer = ({item, index}) => {
  const [sorting, setSorting] = useState(false);
  const [questions, setQuestions] = useState<Answer>(item.questions || [])
  const navigation = useNavigation();

  // Re-sort quizzes when the `sorting` state changes
  useEffect(() => {
    const sortedQuestionsList = sortQuizzes(questions);
    setQuestions(sortedQuestionsList);
  }, [sorting]);

  // Helper function to sort quizzes
  const sortQuizzes = questions => {
    return [...questions].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sorting) {
        // If sorting is true, sort from earliest to latest
        return dateA - dateB;
      } else {
        // If sorting is false, sort from latest to earliest
        return dateB - dateA;
      }
    });
  };

  return (
    <>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeading} key={index}>
          🚀 {item?.categoryName}
        </Text>
        <TouchableOpacity
          style={[styles.sortCtn]}
          onPress={() => setSorting(prev => !prev)}>
          {sorting ? (
            <AppIcons.SortAscending
              size={moderateScale(20)}
              color={Colors.primaryDark}
              disabled
            />
          ) : (
            <AppIcons.SortDescending
              size={moderateScale(20)}
              color={Colors.primaryDark}
              disabled
            />
          )}
          {/* <Text style={styles.sortText}>Sort</Text> */}
        </TouchableOpacity>
      </View>
      {questions?.map((question, index) => {
        return (
          <QuestionCard
            question={question}
            index={index}
            key={index}
            onPress={() =>
              navigation.navigate(Routes.AnswerDisplayScreen, {
                question: question,
              })
            }
          />
        );
      })}
    </>
  );
};

export default CategorySectionContainer;
