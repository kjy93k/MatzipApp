import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '@/constants';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = (
  { disabled = false, error, touched, icon = null, ...props }: InputFieldProps,
  ref?: ForwardedRef<TextInput>,
) => {
  const inputRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => inputRef.current as TextInput);

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          props.multiline && styles.multiline,
          touched && error && styles.inputError,
        ]}
      >
        <View style={Boolean(icon) && styles.innerContainer}>
          {icon}
          <TextInput
            ref={inputRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
        </View>
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.BLACK,
  },
  multiline: {
    paddingBottom: deviceHeight > 700 ? 45 : 30,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default forwardRef(InputField);
