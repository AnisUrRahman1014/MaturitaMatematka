import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import styles from './Styles';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import AlertModal from '../../components/AlertModal/AlertModal';
import {Images} from '../../../assets/images';
import {logoutUser} from '../../redux/slices/persistSlice';
import {AppConstants, Colors} from '../../utils/System/Constants';
import AppIcons from '../../libs/NativeIcons';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/Routes';

const SideMenu = (props: any) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [showAlert, setShowAlert] = useState(false);

  const tabs = [
    {
      label: 'History',
      icon: (focused: boolean) => (
        <AppIcons.HistoryIcon
          disabled
          size={moderateScale(25)}
          color={Colors.primaryDark}
          style={{
            ...styles.iconContainer,
            backgroundColor: Colors.white,
          }}
        />
      ),
      onPress: () => {
        setSelectedIndex(0);
        props.navigation.closeDrawer();
        setTimeout(() => {
          props.navigation.navigate(Routes.HistoryScreen);
          setSelectedIndex(-1);
        }, 50);
      },
    },
    {
      label: 'Favorites',
      icon: (focused: boolean) => (
        <AppIcons.StarIcon
          disabled
          size={moderateScale(25)}
          color={Colors.primaryDark}
          style={{
            ...styles.iconContainer,
            backgroundColor: Colors.white,
          }}
        />
      ),
      onPress: () => {
        setSelectedIndex(1);

        props.navigation.closeDrawer();
        setTimeout(() => {
          props.navigation.navigate(Routes.FavoritesScreen);
          setSelectedIndex(-1);
        }, 200);
      },
    },
    {
      label: 'Incorrect Answers',
      icon: (focused: boolean) => (
        <AppIcons.AlertCircle
          disabled
          size={moderateScale(25)}
          color={Colors.primaryDark}
          style={{
            ...styles.iconContainer,
            backgroundColor: Colors.white,
          }}
        />
      ),
      onPress: () => {
        setSelectedIndex(2);
        props.navigation.closeDrawer();
        setTimeout(() => {
          props.navigation.navigate(Routes.IncorrectAnswersScreen);
          setSelectedIndex(-1);
        }, 200);
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{position: 'relative', top: -40, right: 10}}>
          <AppIcons.MenuIcon
            size={35}
            color={Colors.white}
            style={styles.menuIcon}
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>
        {tabs.map((item, index) => {
          const isFocused = selectedIndex === index;
          return (
            <DrawerItem
              key={index}
              style={{
                ...styles.btn,
                backgroundColor: isFocused ? Colors.primaryDark : Colors.white,
              }}
              label={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '115%',
                  }}>
                  <View style={styles.btnContainer}>
                    {item.icon(isFocused)}

                    <Text style={styles.label(isFocused)}>{item.label}</Text>
                  </View>
                  <AppIcons.ChevronRightIcon
                    disabled
                    size={moderateScale(20)}
                    color={isFocused ? Colors.white : Colors.primaryDark}
                    style={{
                      ...styles.iconContainer,
                    }}
                  />
                </View>
              )}
              onPress={item.onPress}
            />
          );
        })}
      </DrawerContentScrollView>
      <DrawerItem
        style={{
          height: '5.5%',
          width: '90%',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: Colors.primaryDark,
          paddingHorizontal: '4%',
        }}
        label={() => (
          <View style={styles.logoutBtnContainer}>
            <Text
              style={{
                ...styles.label(true),
                fontSize: AppConstants.FontSizes.t2,
                textAlign: 'center',
                width: '90%',
              }}>
              Log out
            </Text>
            <AppIcons.LogoutIcon
              disabled
              size={moderateScale(22)}
              color={Colors.white}
              style={{
                ...styles.iconContainer,
              }}
            />
          </View>
        )}
        onPress={() => {
          setShowAlert(true);
        }}
      />

      <AlertModal
        visible={showAlert}
        heading="Log Out"
        message="Are you sure, you want to log out?"
        confirmButtonTitle="Yes, Log Out"
        onConfirm={() => {
          setShowAlert(false);
          setTimeout(() => {
            props.navigation.closeDrawer();
            dispatch(logoutUser(null));
          }, 1000);
          // dispatch(dispatchLogOut());
        }}
        onCancel={() => setShowAlert(false)}
      />
    </SafeAreaView>
  );
};

export default SideMenu;
