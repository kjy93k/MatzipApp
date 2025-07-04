import { baseUrl } from '@/api/axios';
import useImagePicker from '@/hooks/useImagePicker';
import { ImageUri } from '@/types';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

const PreviewImageList = ({ imageUris }: PreviewImageListProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({ uri }, index) => (
          <Pressable key={index} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrl.ios : baseUrl.android
                }/${uri}`,
              }}
              style={styles.image}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 8,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PreviewImageList;
