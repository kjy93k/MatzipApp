import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapStackNavigator, {
  MapStackParamList,
} from '../stack/MapStackNavigator';
import { colors, MainNavigations } from '@/constants';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamList = {
  [MainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [MainNavigations.FEED]: undefined;
  [MainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator();

const DrawerIcons = (
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
) => {
  let iconName = '';

  switch (route.name) {
    case MainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case MainNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case MainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      color={focused ? colors.PINK_700 : colors.GRAY_500}
      size={18}
    />
  );
};

const MainDrawerNavigator = ({}: MainDrawerParamList) => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.PINK_700,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerLabelStyle: {
          fontWeight: 600,
        },
        drawerIcon: ({ focused }) =>
          DrawerIcons(route as RouteProp<MainDrawerParamList>, focused),
      })}
    >
      <Drawer.Screen
        name={MainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={MainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={MainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
