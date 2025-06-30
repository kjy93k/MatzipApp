import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { colors, mapNavigations } from '@/constants';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateAddPost } from '@/\butils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({ route, navigation }: AddPostScreenProps) => {
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const { location } = route.params;
  const handleSubmit = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력하세요."
            returnKeyType="next"
            submitBehavior="submit" // next키로 인풋 포커스 이동 시 키보드 고정
            onSubmitEditing={() => descriptionRef.current?.focus()} // 다음 인풋 포커스
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            multiline
            keyboardType="default"
            returnKeyType="default"
            {...addPost.getTextInputProps('description')}
          />
        </View>
        {/* <Text>{location.latitude}</Text> */}
        {/* <Text>{location.longitude}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;
