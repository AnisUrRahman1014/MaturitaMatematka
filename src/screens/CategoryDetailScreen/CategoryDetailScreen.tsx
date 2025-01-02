import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../components/NavHeader/NavHeader';
import styles, {section} from './Styles';
import {Images} from '../../../assets/images';
import CustomButton from '../../components/CustomButton/CustomButton';
import Routes from '../../navigation/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../navigation/types';

type Props = {
  route: any;
  navigation: NativeStackNavigationProp<RootStackList, 'CategoryDetailScreen'>;
};
const CategoryDetailScreen = (props: Props) => {
  const category = props?.route?.params?.category;
  const navigation = props?.navigation;
  const [description, setDescription] = useState(
    "The Planimetry quiz is designed to test and reinforce your understanding of two-dimensional geometry, focusing on the calculation of areas and properties of various geometric shapes. Participants will encounter a range of questions that challenge their knowledge of area formulas, unit conversions, and applications of planimetry in real-world contexts. Whether you're a student honing your skills or someone looking to refresh your geometry knowledge, this quiz offers a fun and engaging way to deepen your understanding of flat shapes and their measurements. Perfect for both individual study and group challenges, the Planimetry quiz is an excellent resource for mastering the essentials of planar geometry.",
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="About" />
      {/* Content Portion */}
      <View style={styles.introContainer}>
        <View style={styles.titleAndTagContainer}>
          <Text style={styles.title}>{category?.title}</Text>
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
          onPress={() =>
            navigation.navigate(Routes.Quiz, {panelType: 'browse'})
          }
        />
        <CustomButton
          label={'Start the Quiz'}
          boldLabel
          rightIconBtn
          onPress={() => navigation.navigate(Routes.Quiz, {panelType: 'quiz'})}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
