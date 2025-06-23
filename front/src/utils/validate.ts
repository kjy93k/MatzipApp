type UserInformation = {
  email: string;
  password: string;
};

export const validateLogin = (values: UserInformation) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    email: '',
    password: '',
  };

  if (!emailReg.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (values.password.length >= 8 && values.password.length < 20) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
};
