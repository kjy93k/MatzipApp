import { useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

const useForm = <T>({ initialValue, validate }: UseFormProps<T>) => {
  const [values, setValues] = useState(initialValue);
  const [isTouched, setIsTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>,
  );
  const [errorMsg, setErrorMsg] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({ ...values, [name]: text });
  };

  const handleBlur = (name: keyof T) => {
    setIsTouched({
      ...isTouched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChangeText,
      onBlur,
      touched: isTouched[name],
      error: errorMsg[name],
    };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrorMsg(newErrors);
  }, [validate, values]);

  return { values, getTextInputProps };
};

export default useForm;
