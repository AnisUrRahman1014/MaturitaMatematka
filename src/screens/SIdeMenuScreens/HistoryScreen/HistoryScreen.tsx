import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import styles from './Styles';
import PerformanceIndicator from '../../../components/PerformanceIndicator/PerformanceIndicator';

const HistoryScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader centerText="History" leftIcon />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>
          View all the previously attempted quizzes here.
        </Text>
        {/* progress display */}
        <View style={styles.performanceCtn}>
          <PerformanceIndicator />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
