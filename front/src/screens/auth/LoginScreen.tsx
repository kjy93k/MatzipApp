import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../\butils';

interface LoginScreenProps {}

const LoginScreen = ({}: LoginScreenProps) => {
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          // error={login.errors.email} // login.errors에서 getTextInputProps로 이동
          // touched={login.touched.email} // login.touched에서 getTextInputProps로 이동
          inputMode="email"
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          // error={login.errors.password} // login.errors에서 getTextInputProps로 이동
          // touched={login.touched.password} // login.touched에서 getTextInputProps로 이동
          secureTextEntry
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
