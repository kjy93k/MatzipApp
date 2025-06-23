import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarHomeScreen from '../../screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';
import MapHomeScreen from '../../screens/map/MapHomeScreen';

interface MainDrawerNavigatorProps {}

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = ({}: MainDrawerNavigatorProps) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
      <Drawer.Screen name="CalendarHome" component={CalendarHomeScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
