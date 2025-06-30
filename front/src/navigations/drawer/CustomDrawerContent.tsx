import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { Category, Profile } from '@/types/domain';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Image, SafeAreaView, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUri, kakaoImageUri } =
    (getProfileQuery.data as Profile & Category) || {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView
        // scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        {...props}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {imageUri === null && kakaoImageUri === null && (
              <Image
                style={styles.userImage}
                source={require('@/assets/user-default.png')}
              />
            )}
            {imageUri !== null && kakaoImageUri && (
              <Image style={styles.userImage} source={{ uri: kakaoImageUri }} />
            )}
            {imageUri !== null && (
              <Image style={styles.userImage} source={{ uri: imageUri }} />
            )}
          </View>
          <Text style={styles.nameText}>{nickname || email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: colors.WHITE },
  userInfoContainer: {
    alignItems: 'center',
    margin: 15,
    marginBottom: 30,
  },
  nameText: {
    color: colors.BLACK,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
});

export default CustomDrawerContent;
