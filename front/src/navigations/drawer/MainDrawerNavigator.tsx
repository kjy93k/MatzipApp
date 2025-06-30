import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapStackNavigator, {
  MapStackParamList,
} from '../stack/MapStackNavigator';
import { MainNavigations } from '@/constants';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MainDrawerParamList = {
  [MainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [MainNavigations.FEED]: undefined;
  [MainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = ({}: MainDrawerParamList) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name={MainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
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
