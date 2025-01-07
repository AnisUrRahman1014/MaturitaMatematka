import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';
import QuizResult from '../screens/QuizResults/QuizResult';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const user = useSelector((state: RootState) => state?.persistSlice?.user);
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
      {/* <Stack.Screen name="QuizResult" component={QuizResult} /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
