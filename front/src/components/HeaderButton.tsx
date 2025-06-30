import { colors } from '@/constants';
import React, { PropsWithChildren, ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface HeaderButtonProps extends PropsWithChildren<PressableProps> {
  hasError?: boolean;
}

const HeaderButton = ({
  children,
  hasError = false,
  ...props
}: HeaderButtonProps) => {
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {React.Children.map(children, child => {
        if (typeof child === 'string') {
          return (
            <Text style={[styles.text, hasError && styles.textError]}>
              {child}
            </Text>
          );
        }
        if (React.isValidElement(child)) {
          return child;
        }
        return null;
      })}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

export default HeaderButton;
