import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import {Colors} from '../../utils/System/Constants';
import CircularProgress from 'react-native-circular-progress-indicator';
import {moderateScale} from 'react-native-size-matters';

const PerformanceIndicator = ({data} : any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.innerTextCtn}>
          <Text style={styles.desc}>Overall Performance</Text>
          <Text style={[styles.focus, {color: Colors.primaryLight}]}>{data?.badge}</Text>
          <Text style={styles.desc}>Attempted Quizzes: {data?.totalQuizes}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.innerContainer}>
          <CircularProgress
            value={data?.successRate}
            activeStrokeColor={Colors.primaryLight}
            inActiveStrokeOpacity={0}
            progressValueColor={'#fff'}
            valueSuffix={'%'}
            radius={moderateScale(65)}
            strokeLinecap="square"
            progressValueStyle={styles.innerCircleTxt1}
            subtitle={'Success Rate'}
            subtitleStyle={{
              ...styles.innerCircleTxt2,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PerformanceIndicator;
