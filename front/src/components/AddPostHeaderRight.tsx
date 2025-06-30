import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderButton from './HeaderButton';

interface AddPostHeaderRightProps {}

const AddPostHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton onPress={onSubmit}>등록</HeaderButton>;
};

const styles = StyleSheet.create({});

export default AddPostHeaderRight;
