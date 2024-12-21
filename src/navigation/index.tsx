import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const user = useSelector((state: RootState) => state?.persistSlice?.user);
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
      {/* <MainStack /> */}
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
