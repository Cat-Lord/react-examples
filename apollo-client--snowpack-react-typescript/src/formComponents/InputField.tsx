import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik';
import React, { InputHTMLAttributes, LabelHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & LabelHTMLAttributes<HTMLLabelElement> & {
  name: string;
  inputSize?: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, inputSize, ...props }) => {
  const [field, { error }] = useField(props.name);

  return (
    <FormControl isInvalid={!!error}>
      {
        // dont render label if none if supplied
        props['aria-label'] ? <FormLabel htmlFor={field.name}>{props['aria-label']}</FormLabel> : null
      }
      <Input
        size={inputSize}
        {...field}
        {...props}
        id={field.name} />
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputField