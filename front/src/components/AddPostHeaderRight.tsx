import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderButton from './HeaderButton';

interface AddPostHeaderRightProps {}

const AddPostHeaderRight = (onSubmit: () => void, hasError?: boolean) => {
  return (
    <HeaderButton onPress={onSubmit} hasError={hasError}>
      등록
    </HeaderButton>
  );
};

const styles = StyleSheet.create({});

export default AddPostHeaderRight;
