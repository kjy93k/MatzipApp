import React from 'react';
import { StyleSheet } from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

const RootNavigator = () => {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
};

const styles = StyleSheet.create({});

export default RootNavigator;
