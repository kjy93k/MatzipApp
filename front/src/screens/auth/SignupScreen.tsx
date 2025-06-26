import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/\butils';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';
import useAuth from '@/hooks/queries/useAuth';

interface SignupScreenProps {}

const SignupScreen = ({}: SignupScreenProps) => {
  const passwordInputRef = useRef<TextInput | null>(null);
  const passwordConfirmInputRef = useRef<TextInput | null>(null);
  const { signupMutation, loginMutation } = useAuth();

  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const { passwordConfirm, ...signupData } = signup.values;
    signupMutation.mutate(signupData, {
      onSuccess: () => loginMutation.mutate(signupData),
    });
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
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordInputRef}
          placeholder="비밀번호"
          returnKeyType="next"
          submitBehavior="submit"
          secureTextEntry
          textContentType="oneTimeCode"
          onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmInputRef}
          placeholder="비밀번호 확인"
          onSubmitEditing={handleSubmit}
          secureTextEntry
          textContentType="oneTimeCode"
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 30 },
  inputContainer: { gap: 20, marginBottom: 30 },
});

export default SignupScreen;
