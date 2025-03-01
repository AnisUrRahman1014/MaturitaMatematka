import {View, Text, Image, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import {SafeAreaView} from 'react-native';
import {Images} from '../../../../assets/images';
import {Question, section} from '../../../libs/Global';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';
import styles from './Styles';
import queryHandler from '../../../services/queries/queryHandler';
import {API} from '../../../services';
import {showError} from '../../../utils/System/MessageHandlers';
import LoaderModal from '../../../components/LoaderModal/LoaderModal';
import {Colors} from '../../../utils/System/Constants';
import CategorySectionContainer from '../../../components/CategorySectionContainer/CategorySectionContainer';

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'FavoritesScreen'>;
};

const FavoritesScreen = ({navigation}: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const onSuccess = (res: any) => {
    if (res.success) {
      setQuestions(res.favorites);
    } else {
      showError('Something went wrong while getting your favorites');
    }
    setRefreshing(false); // Stop refreshing after data is fetched
  };

  const onError = (err: any) => {
    showError(err.message);
    console.error('Error getting favorites: '.concat(err.message));
    setRefreshing(false); // Stop refreshing on error
  };

  const {refetch, isLoading: APILoading} = queryHandler(
    API.getAllFavorites,
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

  if (APILoading) {
    return <LoaderModal visible={APILoading} />;
  }

  const renderEmptyContainer = () => {
    return (
      <View style={styles.emptyCtn}>
        <Text style={styles.emptyTxt}>No questions available</Text>
      </View>
    );
  };

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
          style={styles.flatlist}
          ListEmptyComponent={renderEmptyContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Bind refreshing state
              onRefresh={onRefresh} // Bind refresh function
              colors={[Colors.primary]} // Customize refresh spinner color (optional)
              tintColor={Colors.primary} // Customize refresh spinner color (optional)
            />
          }
          renderItem={({item, index}) => {
            return <CategorySectionContainer index={index} item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
