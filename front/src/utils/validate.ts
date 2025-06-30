type UserInformation = {
  email: string;
  password: string;
};

const validateUser = (values: UserInformation) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    email: '',
    password: '',
  };

  if (!emailReg.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  return errors;
};

export const validateLogin = (values: UserInformation) => {
  return validateUser(values);
};

export const validateSignup = (
  values: UserInformation & { passwordConfirm: string },
) => {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '' };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
};

export const validateAddPost = (values: {
  title: string;
  description?: string;
}) => {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 30자 이내로 입력해주세요.';
  }

  return errors;
};
