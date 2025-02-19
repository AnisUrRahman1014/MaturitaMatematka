import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {formattedDate, QuizResultData} from '../../libs/Global';
import { moderateScale } from 'react-native-size-matters';

type Props = {
  data: QuizResultData;
};
const SummaryCard = ({data}: Props) => {
  const totalStars = 5; // Total number of stars
  const filledStars = Math.min(Math.max(data.rating, 0), totalStars);

  const getColor = () => {
    switch (data.rating) {
      case 0:
        return Colors.red;
      case 1:
        return '#FFA500';
      case 2:
        return Colors.primaryLight;
      default:
        return Colors.lightGreen;
    }
  };
  return (
    <View style={styles.card}>
      <View style={[styles.horizontalCtn, {width: '100%'}]}>
        <Text style={styles.heading}>Summary</Text>
        <View style={styles.horizontalCtn}>
          {[...Array(totalStars)].map((_, index) => {
            const isFilled = index < filledStars;
            return (
              <View key={index}>
                {isFilled ? (
                  <AppIcons.StarIconFill size={moderateScale(25)} color={Colors.offWhite} />
                ) : (
                  <AppIcons.StarIconOutline size={moderateScale(25)} color={Colors.offWhite} />
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.horizontalCtn, styles.badgeContainer]}>
        <Text style={{...styles.badge, color: getColor()}}>{data.badge}</Text>
      </View>

      <View style={{bottom: 0}}>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Date:</Text>
          <Text style={styles.desc}>{formattedDate(new Date(data.date))}</Text>
        </View>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Category:</Text>
          <Text style={styles.desc}>{data?.category}</Text>
        </View>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Correct Answers:</Text>
          <Text style={[styles.desc]}>
            <Text style={{color: getColor()}}>
              {data?.correctAnswerCount}{' '}
            </Text>
            / {data?.totalQuestions}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryCard;
