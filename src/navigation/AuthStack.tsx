import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/Auth/Signup/Signup';
import Login from '../screens/Auth/Login/Login';
import ForgetPassword from '../screens/Auth/ForgetPassword/ForgetPassword';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const screens = {
    Signup,
    Login,
    ForgetPassword,
  };
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries(screens).map(([name, component]) => {
        return <Stack.Screen key={name} name={name} component={component} />;
      })}
    </Stack.Navigator>
  );
};

export default AuthStack;
