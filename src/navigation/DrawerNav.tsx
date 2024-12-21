import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../screens/SideMenu/SideMenu';
import Home from '../screens/HomeScreen/Home';
import AppIcons from '../libs/NativeIcons';

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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
