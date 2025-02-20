/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../screens/SideMenu/SideMenu';
import Home from '../screens/HomeScreen/Home';
import AppIcons from '../libs/NativeIcons';
import HistoryScreen from '../screens/SIdeMenuScreens/HistoryScreen/HistoryScreen';
import IncorrectAnswersScreen from '../screens/SIdeMenuScreens/IncorrectAnswersScreen/IncorrectAnswersScreen';
import FavoritesScreen from '../screens/SIdeMenuScreens/FavoritesScreen/FavoritesScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {width: '70%'},
        drawerType: 'front',
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
      <Drawer.Screen name="IncorrectAnswersScreen" component={IncorrectAnswersScreen} />
      <Drawer.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
