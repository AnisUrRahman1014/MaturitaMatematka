import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import {Colors} from '../../utils/System/Constants';
import CircularProgress from 'react-native-circular-progress-indicator';

const PerformanceIndicator = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.innerTextCtn}>
          <Text style={styles.desc}>Overall Performance</Text>
          <Text style={[styles.focus, {color: Colors.primaryLight}]}>Good</Text>
          <Text style={styles.desc}>Attempted Quizzes: 20</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.innerContainer}>
          <CircularProgress
            value={85}
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'#fff'}
            valueSuffix={'%'}
          />
          {/* <Text style={[styles.innerCircleTxt1, {color: Colors.primaryLight}]}>
            34 %
          </Text>
          <Text style={styles.innerCircleTxt2}>Avg. Success Rate</Text> */}
        </View>
      </View>
    </View>
  );
};

export default PerformanceIndicator;
