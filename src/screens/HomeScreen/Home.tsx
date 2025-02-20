import {View, Text, SafeAreaView, FlatList, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import AppIcons from '../../libs/NativeIcons';
import styles, {section} from './Styles';
import {AppConstants, Colors} from '../../utils/System/Constants';
import {Image} from 'react-native';
import CategoryListCard from '../../components/CategoryListCard/CategoryListCard';
import {Images} from '../../../assets/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import auth from '@react-native-firebase/auth';
import queryHandler from '../../services/queries/queryHandler';
import {API} from '../../services';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'Home'>;
};
const Home = (props: Props) => {
  const navigation = props?.navigation;
  const user = useSelector((state: RootState) => state?.persistSlice);
  const [categories, setCategories] = useState();
  // console.log(JSON.stringify(user, null, 1));

  const onSuccess = (res: {success: boolean; categories: []}) => {
    if (res?.success) {
      setCategories(res.categories);
    }
  };

  const onError = (error: {}) => {
    console.log('Failed to get Categories', error);
  };

  const {refetch, isLoading} = queryHandler(
    API.getCategories,
    onSuccess,
    onError,
  );

  useEffect(() => {
    getToken();
    refetch();
  }, []);

  const getToken = async () => {
    const token = await auth().currentUser?.getIdToken();
    console.log(token);
  };

  const menuButton = (
    <AppIcons.MenuIcon
      size={35}
      color={Colors.primaryDark}
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}
    />
  );

  const renderEmptyComponent = () => {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <NavHeader centerText="Maturita Matematka" rightIcon={menuButton} />
      {/* Content Container */}
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        {/* Welcome and DP Container */}
        <View
          style={[
            section(0.18, 'row'),
            {
              padding: AppConstants.ContainerPaddings.max,
            },
          ]}>
          {/* Left Section */}
          <View style={[section(0.6, 'column'), {alignItems: 'flex-start'}]}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {user?.user?.displayName?.trim()}
            </Text>
            <Text style={styles.tagLine}>
              Challenge Your Knowledge, One Question at a Time!
            </Text>
          </View>

          {/* Right Section */}
          <View style={[section(0.4, 'column')]}>
            <View style={styles.dpContainer}>
              <View style={styles.dpInnerContainer}>
                <Image
                  source={
                    user?.user?.photoURL
                      ? {uri: user?.user?.photoURL}
                      : Images?.DummyProfilePic
                  }
                  style={
                    user?.user?.photoURL
                      ? styles.dp
                      : {width: '60%', height: '60%'}
                  }
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Category Container */}
        <View
          style={[
            section(0.05, 'row'),
            {paddingHorizontal: '5%', justifyContent: 'flex-start'},
          ]}>
          <Image
            source={Images.CategoryIcon}
            style={styles.categoryIcon}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Categories</Text>
        </View>

        <View style={[section(0.6, 'column')]}>
          <FlatList
            data={categories}
            style={styles.flatlist}
            renderItem={({item, index}) => {
              return (
                <CategoryListCard
                  key={index}
                  icon={item?.icon}
                  title={item?.categoryName}
                  tagLine={item?.tagLine}
                  category={item}
                />
              );
            }}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={styles.categoryContentCtn}
          />
        </View>
      </View>
      <LoaderModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default Home;
