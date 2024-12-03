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

type Props = {
  title: String;
  tagLine: String;
  icon: ImageSourcePropType;
};
const CategoryListCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Icon Container */}
      <View style={styles.leftContainer}>
        <View style={styles.leftInnerContainer}>
          <Image source={props.icon} style={styles.icon} resizeMode="contain" />
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.tagLine}>{props.tagLine}</Text>
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
