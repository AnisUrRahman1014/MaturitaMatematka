import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import styles from './Styles';
import AppIcons from '../../libs/NativeIcons';
import Routes from '../../navigation/Routes';
import {useNavigation} from '@react-navigation/native';

type Props = {
  // navigation: NativeStackNavigationProp<RootStackList, 'CategoryDetailScreen'>;
  title: String;
  tagLine: String;
  icon: string;
  category: Object;
};
const CategoryListCard = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.CategoryDetailScreen, {
          category: props.category,
        });
      }}>
      {/* Icon Container */}
      <View style={styles.leftContainer}>
        <View style={styles.leftInnerContainer}>
          <Image
            source={{uri: props.icon}}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
        <Text style={styles.tagLine} numberOfLines={1} ellipsizeMode="tail">
          {props.tagLine}
        </Text>
      </View>
      <AppIcons.ChevronRightIcon
        size={20}
        color="white"
        disabled
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

export default CategoryListCard;
