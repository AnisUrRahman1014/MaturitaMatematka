import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import Routes from '../../navigation/Routes';
import {formattedDate, QuizResultData, section} from '../../libs/Global';
import {Images} from '../../../assets/images';
import {Colors} from '../../utils/System/Constants';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import queryHandler from '../../services/queries/queryHandler';
import {API} from '../../services';

type Props = {
  quiz: QuizResultData;
};
const QuizCard = (props: Props) => {
  const {quiz} = props;
  const navigation = useNavigation();
  const [icon, setIcon] = useState('');

  const onSuccess = (res: any) => {
    console.log(res);
    if(res.success){
      setIcon(res.categoryIcon)
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const {refetch} = queryHandler(
    API.getCategoryIcon(quiz.category),
    onSuccess,
    onError,
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.QuizDetail, {
          quiz: quiz.answers,
          panelType: 'browse',
        });
      }}>
      {/* Icon Container */}
      <View style={styles.leftContainer}>
        <View style={styles.leftInnerContainer}>
          <Image
            source={{uri: icon}}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {quiz?.category}
        </Text>
        <View>
          <View style={[section(0, 'row'), styles.desc]}>
            <Text style={styles.tagLine}>Date: </Text>
            <Text style={styles.tagLine}>
              {formattedDate(new Date(quiz.date))}
            </Text>
          </View>
          <View style={[section(0, 'row'), styles.desc]}>
            <Text style={styles.tagLine}>Correct Answers: </Text>
            <View style={section(0, 'row')}>
              <Text style={styles.correctAnswer}>{quiz.correctAnswers} </Text>
              <Text style={styles.tagLine}>/ {quiz.totalQuestions} </Text>
            </View>
          </View>
        </View>
      </View>
      <AppIcons.ChevronRightIcon
        size={moderateScale(20)}
        color={Colors.primaryDark}
        disabled
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

export default QuizCard;
