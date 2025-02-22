import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import styles from './Styles';
import PerformanceIndicator from '../../../components/PerformanceIndicator/PerformanceIndicator';
import AppIcons from '../../../libs/NativeIcons';
import {AppConstants, Colors} from '../../../utils/System/Constants';
import {QuizResultData, section} from '../../../libs/Global';
import QuizCard from '../../../components/QuizCard/QuizCard';
import {Animated} from 'react-native';
import queryHandler from '../../../services/queries/queryHandler';
import {API} from '../../../services';
import {showError} from '../../../utils/System/MessageHandlers';
import LoaderModal from '../../../components/LoaderModal/LoaderModal';
import {moderateScale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

const HistoryScreen = () => {
  const [sorting, setSorting] = useState(false);
  const [summary, setSummary] = useState({});
  const [quizzes, setQuizzes] = useState<QuizResultData[]>([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const onSuccess = res => {
    if (res.success) {
      const unsortedQuizes = res?.quizes;
      // Sort the quizzes based on the date field
      const sortedQuizList = sortQuizzes(unsortedQuizes);
      setQuizzes(sortedQuizList);
      setSummary(res.data);
    }
    setRefreshing(false);
  };

  const onError = error => {
    console.log(error);
    showError('Failed to get quiz history: '.concat(error.message));
    setRefreshing(false); // Stop refreshing on error
  };

  const {refetch, isLoading} = queryHandler(
    API.getQuizHistory,
    onSuccess,
    onError,
  );

  // Function to handle refresh
  const onRefresh = () => {
    setRefreshing(true); // Start refreshing
    refetch(); // Fetch new data
  };

  useEffect(() => {
    refetch();
  }, []);

  // Sort quizzes whenever sorting or original quizzes change
  useEffect(() => {
    const sortedQuizList = sortQuizzes(quizzes);
    setQuizzes(sortedQuizList);
  }, [sorting]);

  // Helper function to sort quizzes
  const sortQuizzes = quizzes => {
    return [...quizzes].sort((a, b) => {
      // Spread operator is good here, to create a new array to be sorted.
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sorting) {
        // If sorting is true, sort from earliest to latest
        return dateA - dateB;
      } else {
        // If sorting is false, sort from latest to earliest
        return dateB - dateA;
      }
    });
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const offset = headerHeight - headerFinalHeight;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
    extrapolate: 'clamp',
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: 'clamp',
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: 'clamp',
  });

  const header = () => (
    <Animated.View
      style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
      <Animated.View
        style={[
          styles.image,
          {
            transform: [
              {translateY: translateImageY},
              {translateX: translateImageX},
              {scale: scaleImage},
            ],
          },
        ]}>
        <Text style={styles.heading}>
          View all the previously attempted quizzes here.
        </Text>
        <PerformanceIndicator data={summary} />
        <TouchableOpacity
          style={[section(0, 'row'), styles.sortCtn]}
          onPress={() => setSorting(prev => !prev)}>
          {sorting ? (
            <AppIcons.SortAscending
              size={20}
              color={Colors.primaryDark}
              disabled
            />
          ) : (
            <AppIcons.SortDescending
              size={20}
              color={Colors.primaryDark}
              disabled
            />
          )}
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  const renderEmptyContainer = () => {
    return (
      <View style={styles.emptyCtn}>
        <Text style={styles.emptyTxt}>No History Available</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader centerText="History" leftIcon />
      <View style={styles.mainContainer}>
        <FlatList
          data={quizzes}
          ListHeaderComponent={header}
          ListEmptyComponent={renderEmptyContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Bind refreshing state
              onRefresh={onRefresh} // Bind refresh function
              colors={[Colors.primary]} // Customize refresh spinner color (optional)
              tintColor={Colors.primary} // Customize refresh spinner color (optional)
            />
          }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return <QuizCard quiz={item} key={index} />;
          }}
          style={styles.flatlist}
          contentContainerStyle={{
            paddingVertical: AppConstants.ContainerPaddings.avg,
          }}
        />
      </View>
      <LoaderModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default HistoryScreen;
