import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import {SafeAreaView} from 'react-native';
import {Images} from '../../../../assets/images';
import {Question, section} from '../../../libs/Global';
import QuestionCard from '../../../components/QuestionCard/QuestionCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';
import styles from './Styles';
import Routes from '../../../navigation/Routes';
import queryHandler from '../../../services/queries/queryHandler';
import {API} from '../../../services';
import {showError} from '../../../utils/System/MessageHandlers';
import LoaderModal from '../../../components/LoaderModal/LoaderModal';
import AppIcons from '../../../libs/NativeIcons';
import {Colors} from '../../../utils/System/Constants';
import CategorySectionContainer from '../../../components/CategorySectionContainer/CategorySectionContainer';
import {moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'FavoritesScreen'>;
};
const FavoritesScreen = ({navigation}: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]); // TODO: replace with actual data
  const onSuccess = (res: any) => {
    if (res.success) {
      setQuestions(res.favorites);
    } else {
      showError('Something went wrong while getting your favorites');
    }
  };

  const onError = (err: any) => {
    showError(err.message);
    console.error('Error getting favorites: '.concat(err.message));
  };

  const {refetch, isLoading: APILoading} = queryHandler(
    API.getAllFavorites,
    onSuccess,
    onError,
  );

  useEffect(() => {
    refetch();
  }, []);

  if (APILoading) {
    return <LoaderModal visible={APILoading} />;
  }

  return (
    <SafeAreaView>
      <NavHeader centerText="Favorites" leftIcon />
      <View style={styles.mainContainer}>
        <View style={[section(0, 'row'), styles.rowCtn]}>
          <Image
            source={Images.CategoryIcon}
            style={styles.categoryIcon}
            resizeMode="contain"
          />
          <Text style={styles.pgHeading}>Favoritised Questions</Text>
        </View>

        <FlatList
          data={questions}
          style={{height: '87%'}}
          renderItem={({item, index}) => {
            return <CategorySectionContainer index={index} item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
