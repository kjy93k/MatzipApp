import { colors } from '@/constants';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

const ImageInput = ({ onChange }: ImageInputProps) => {
  return (
    <View>
      <Pressable
        onPress={onChange}
        style={({ pressed }) => [
          styles.imageInput,
          pressed && styles.imageInputPressed,
        ]}
      >
        <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
        <Text style={styles.inputText}>사진 추가</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default ImageInput;
