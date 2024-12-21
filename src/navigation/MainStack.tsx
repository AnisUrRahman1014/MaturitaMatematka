import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen/Home';
import CategoryDetailScreen from '../screens/CategoryDetailScreen/CategoryDetailScreen';
import DrawerNavigation from './DrawerNav';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const screens = {
    DrawerNavigation,
    Home,
    CategoryDetailScreen,
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries(screens).map(([name, component]) => {
        return <Stack.Screen key={name} name={name} component={component} />;
      })}
    </Stack.Navigator>
  );
};

export default MainStack;
