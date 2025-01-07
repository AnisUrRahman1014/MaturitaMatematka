import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen/Home';
import CategoryDetailScreen from '../screens/CategoryDetailScreen/CategoryDetailScreen';
import DrawerNavigation from './DrawerNav';
import Quiz from '../screens/Quiz/Quiz';
import QuizResult from '../screens/QuizResults/QuizResult';
import IncorrectAnswersScreen from '../screens/SIdeMenuScreens/IncorrectAnswersScreen/IncorrectAnswersScreen';
import HistoryScreen from '../screens/SIdeMenuScreens/HistoryScreen/HistoryScreen';
import FavoritesScreen from '../screens/SIdeMenuScreens/FavoritesScreen/FavoritesScreen';
import AnswerDisplayScreen from '../screens/AnserDisplayScreen/AnswerDisplayScreen';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const screens = {
    DrawerNavigation,
    Home,
    CategoryDetailScreen,
    Quiz,
    QuizResult,
    IncorrectAnswersScreen,
    HistoryScreen,
    FavoritesScreen,
    AnswerDisplayScreen,
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
