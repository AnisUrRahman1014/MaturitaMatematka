import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import AppIcons from '../../libs/NativeIcons';
import styles, {section} from './Styles';
import {AppConstants, Colors} from '../../utils/System/Constants';
import {Image} from 'react-native';
import CategoryListCard from '../../components/CategoryListCard/CategoryListCard';
import {Images} from '../../../assets/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/types';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackList, 'Home'>;
// };
const Home = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state?.persistSlice);

  const [categories, setCategories] = useState([
    {
      title: 'Plainimetry',
      tagLine: 'Unraveling the Geometry of Flat Spaces',
      icon: Images.Plainimetry,
    },
    {
      title: 'Equations',
      tagLine: 'Discover the shape of every angle!',
      icon: Images.Equations,
    },
    {
      title: 'Algebric Expressions',
      tagLine: 'Unravel the Mysteries of X and Y!',
      icon: Images.Algebric,
    },
    {
      title: 'Sequences and Financial Mathematics',
      tagLine:
        'Master Patterns, Build Wealth: Your Guide to Sequences and Financial Mathematics',
      icon: Images.Sequences,
    },
    {
      title: 'Stereometry',
      tagLine: 'Unlocking Dimensions: Explore the World of Stereometry',
      icon: Images.Stereometry,
    },
    {
      title: 'Combinations',
      tagLine: 'Endless Possibilities: The Power of Combinations',
      icon: Images.Combinations,
    },
    {
      title: 'Functions',
      tagLine: 'Connecting Inputs to Outcomes: The Essence of Functions',
      icon: Images.Formula,
    },
  ]);

  const menuButton = (
    <AppIcons.MenuIcon
      size={35}
      color={Colors.primaryDark}
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}
    />
  );
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
            source={require('../../../assets/images/categoryIcon.png')}
            style={styles.categoryIcon}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Categories</Text>
        </View>

        <View style={[section(0.6, 'column')]}>
          <FlatList
            data={categories}
            style={{
              width: '100%',
            }}
            renderItem={({item, index}) => {
              return (
                <CategoryListCard
                  icon={item?.icon}
                  title={item?.title}
                  tagLine={item?.tagLine}
                  category={item}
                />
              );
            }}
            contentContainerStyle={{
              padding: '5%',
              gap: 15,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
