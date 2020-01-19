import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {
  NAV_APP,
  NAV_HOME,
  NAV_SPLASH,
  NAV_DRAWER,
  NAV_LOCATION_TYPE,
} from 'src/constants/routes.constants';
import { Drawer } from 'src/components/drawer/Drawer';
import HomeScreen from 'src/screens/home/HomeScreen';
import SplashScreen from 'src/screens/splash/SplashScreen';
import LocationTypeScreen from 'src/screens/locationType/LocationTypeScreen';
import { HeaderDrawer } from 'src/components/screens/HeaderDrawer';
import { HeaderTitle } from 'src/components/screens/HeaderTitle';
import { HeaderActions } from 'src/components/screens/HeaderActions';
import { SCREEN_TYPE_LIST } from 'src/constants/screenType.constants';

// App
const AppStack = createStackNavigator(
  {
    [NAV_HOME]: HomeScreen,
    [NAV_LOCATION_TYPE]: {
      screen: LocationTypeScreen,
      params: {
        screenType: SCREEN_TYPE_LIST,
      },
    },
  },
  {
    headerMode: 'float',
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Stock Track',
      headerLeft: HeaderDrawer,
      headerRight: <HeaderActions navigation={navigation} />,
      headerTitle: props => <HeaderTitle {...props} navigation={navigation} />,
    }),
  },
);

// Drawer
const DrawerStack = createDrawerNavigator(
  {
    [NAV_APP]: AppStack,
  },
  {
    initialRouteName: NAV_APP,
    contentComponent: Drawer,
  },
);

// Splash
const SplashStack = createSwitchNavigator(
  {
    [NAV_SPLASH]: SplashScreen,
    [NAV_DRAWER]: DrawerStack,
  },
  {
    initialRouteName: NAV_SPLASH,
  },
);

export default createAppContainer(SplashStack);
