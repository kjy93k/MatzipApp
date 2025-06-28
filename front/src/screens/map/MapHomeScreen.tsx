import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapHomeScreen = () => {
  const { logoutMutation } = useAuth();
  // return <MapView style={styles.container} />;
  return <MapView style={styles.container} provider={PROVIDER_GOOGLE} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
