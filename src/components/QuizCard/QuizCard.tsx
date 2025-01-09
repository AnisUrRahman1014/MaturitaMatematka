import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import Routes from '../../navigation/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';
import {QuizResultData, section} from '../../libs/Global';
import {Images} from '../../../assets/images';
import {Colors} from '../../utils/System/Constants';
import {useNavigation} from '@react-navigation/native';
import QuizDetail from '../../screens/QuizDetail/QuizDetail';

type Props = {
  quiz: QuizResultData;
};
const QuizCard = (props: Props) => {
  const {quiz} = props;
  const navigation = useNavigation();
  const [icon, setIcon] = useState(Images.Plainimetry);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.QuizDetail, {
          quiz: quiz,
          panelType: 'browse',
        });
      }}>
      {/* Icon Container */}
      <View style={styles.leftContainer}>
        <View style={styles.leftInnerContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
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
            <Text style={styles.tagLine}>{quiz.date}</Text>
          </View>
          <View style={[section(0, 'row'), styles.desc]}>
            <Text style={styles.tagLine}>Correct Answers: </Text>
            <View style={section(0, 'row')}>
              <Text style={styles.correctAnswer}>
                {quiz.correctAnswerCount}{' '}
              </Text>
              <Text style={styles.tagLine}>/ {quiz.totalQuestions} </Text>
            </View>
          </View>
        </View>
      </View>
      <AppIcons.ChevronRightIcon
        size={20}
        color={Colors.primaryDark}
        disabled
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

export default QuizCard;
