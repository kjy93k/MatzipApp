import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../\butils';

interface SignupScreenProps {}

const SignupScreen = ({}: SignupScreenProps) => {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          inputMode="email"
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry
          {...signup.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          secureTextEntry
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 30 },
  inputContainer: { gap: 20, marginBottom: 30 },
});

export default SignupScreen;
