import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import {Colors} from '../../utils/System/Constants';
import {formattedDate, QuizResultData} from '../../libs/Global';

type Props = {
  data: QuizResultData;
};
const SummaryCard = ({data}: Props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.horizontalCtn, {width: '100%'}]}>
        <Text style={styles.heading}>Summary</Text>
        <View style={styles.horizontalCtn}>
          <AppIcons.StarIconFill size={25} color={Colors.offWhite} />
          <AppIcons.StarIconFill size={25} color={Colors.offWhite} />
          <AppIcons.StarIconFill size={25} color={Colors.offWhite} />
          <AppIcons.StarIconFill size={25} color={Colors.offWhite} />
          <AppIcons.StarIconFill size={25} color={Colors.offWhite} />
        </View>
      </View>

      <View style={[styles.horizontalCtn, styles.badgeContainer]}>
        <Text style={{...styles.badge, color: Colors.primaryLight}}>Fair</Text>
      </View>

      <View style={{bottom: 0}}>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Date:</Text>
          <Text style={styles.desc}>{formattedDate(new Date(Date.now()))}</Text>
        </View>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Category:</Text>
          <Text style={styles.desc}>{data?.category}</Text>
        </View>
        <View style={[styles.horizontalCtn]}>
          <Text style={styles.desc}>Correct Answers:</Text>
          <Text style={[styles.desc]}>
            <Text style={{color: Colors.darkGreen}}>
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
