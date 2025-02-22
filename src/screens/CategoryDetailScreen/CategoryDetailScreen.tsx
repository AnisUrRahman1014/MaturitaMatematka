import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import styles, {section} from './Styles';
import {Images} from '../../../assets/images';
import CustomButton from '../../components/CustomButton/CustomButton';
import Routes from '../../navigation/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';
import {showError} from '../../utils/System/MessageHandlers';
import {API} from '../../services';
import queryHandler from '../../services/queries/queryHandler';
import LoaderModal from '../../components/LoaderModal/LoaderModal';

type Props = {
  route: any;
  navigation: NativeStackNavigationProp<RootStackList, 'CategoryDetailScreen'>;
};
const CategoryDetailScreen = (props: Props) => {
  const category = props?.route?.params?.category;
  const navigation = props?.navigation;
  const description = category.description || 'No Description Available';
  const [questions, setQuestions] = useState([]);
  const [isStartingQuiz, setIsStartingQuiz] = useState(false);
  const [flowType, setFlowType] = useState<'browse' | 'quiz'>();

  const onSuccess = (response: any) => {
    // console.log('Success', JSON.stringify(response, null, 1));
    setQuestions(response.questions);
  };

  const onError = (error: any) => {
    showError(error.message);
  };

  const {refetch, isLoading} = queryHandler(
    API.getQuestions.concat(`/${category.categoryName}`),
    onSuccess,
    onError,
  );

  const {refetch: allQuestionsRefetch, isLoading: allQuestionsLoading} =
    queryHandler(
      API.getAllCategoryQuestions.concat(`/${category.categoryName}`),
      onSuccess,
      onError
    );

  // Trigger navigation when questions are updated
  useEffect(() => {
    console.log(flowType)
    if (isStartingQuiz && flowType && questions.length > 0) {
      navigation.navigate(Routes.Quiz, {
        panelType: flowType,
        category,
        quizQuestions: questions,
      });
      setIsStartingQuiz(false);
      setQuestions([]); // Reset the flag
    }
  }, [questions, isStartingQuiz, navigation, category]);

  if (isLoading) {
    return <LoaderModal visible={isLoading || allQuestionsLoading} />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="About" />
      {/* Content Portion */}
      <View style={styles.introContainer}>
        <View style={styles.titleAndTagContainer}>
          <Text style={styles.title}>{category?.categoryName}</Text>
          <Text style={styles.tagLine}>{category?.tagLine}</Text>
        </View>
        <View style={styles.iconContainerBG}>
          <View style={styles.iconContainerFG}>
            <Image
              source={category?.icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Description Label */}
      <View
        style={[
          section(0.2, 'row'),
          {paddingHorizontal: '5%', justifyContent: 'flex-start'},
        ]}>
        <Image
          source={require('../../../assets/images/categoryIcon.png')}
          style={styles.categoryIcon}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Description</Text>
      </View>

      <View style={[section(2, 'column'), styles.descriptionContainer]}>
        <ScrollView>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
        <CustomButton
          label={'Browse through questions'}
          rightIconBtn
          lightBtn
          onPress={async () => {
            setFlowType('browse');
            setIsStartingQuiz(true); // Set the flag to indicate quiz is being started
            await allQuestionsRefetch(); // Fetch questions
          }}
        />
        <CustomButton
          label={'Start the Quiz'}
          boldLabel
          rightIconBtn
          onPress={async () => {
            setFlowType('quiz');
            setIsStartingQuiz(true); // Set the flag to indicate quiz is being started
            await refetch(); // Fetch questions
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
