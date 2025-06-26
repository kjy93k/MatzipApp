import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/\butils';
import useAuth from '@/hooks/queries/useAuth';

interface LoginScreenProps {}

const LoginScreen = ({}: LoginScreenProps) => {
  const passwordInputRef = useRef<TextInput | null>(null);
  const { loginMutation } = useAuth();
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          submitBehavior="submit" // next키로 인풋 포커스 이동 시 키보드 고정
          onSubmitEditing={() => passwordInputRef.current?.focus()} // 다음 인풋 포커스
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordInputRef}
          placeholder="비밀번호"
          returnKeyType="join"
          submitBehavior="submit"
          secureTextEntry
          textContentType="oneTimeCode"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
});

export default LoginScreen;
