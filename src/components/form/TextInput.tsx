import React from 'react';
import { Input } from 'react-native-elements';
import { Field, FieldProps } from 'formik';
import { StyleSheet } from 'react-native';

interface TextInputProps {
  name: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

const styles = StyleSheet.create({
  label: {
    textTransform: 'capitalize',
  },
});

export function TextInput(props: TextInputProps) {
  // Props
  const { name, disabled, label, placeholder } = props;

  // Methods
  const renderField = ({ field, meta }: FieldProps) => {
    // Field variables
    const { name, value: fValue, onChange, onBlur } = field;
    const { touched, error, initialTouched, initialValue, initialError } = meta;

    const isTouched = initialTouched || touched;
    const value = fValue || initialValue;
    const errorMessage = !isTouched ? initialError : error;

    return (
      <Input
        value={value}
        disabled={disabled}
        label={label}
        labelStyle={styles.label}
        placeholder={placeholder}
        errorMessage={errorMessage}
        onBlur={onBlur(name)}
        onChangeText={onChange(name)}
      />
    );
  };

  return <Field name={name}>{renderField}</Field>;
}
