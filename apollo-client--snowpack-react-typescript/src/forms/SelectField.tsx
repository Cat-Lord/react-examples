import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'
import { Field, useField } from 'formik';
import React, { SelectHTMLAttributes } from 'react'


type SelectFieldProps<T> = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  width?: string;
  selectSize?: string;

  items: T[];

  // callbacks
  getKey: (item: T) => string;
  getValue: (item: T) => string;
};

const SelectField: React.FC<SelectFieldProps<any>> = ({ size: _size, getKey, getValue, selectSize, ...props }) => {
  const [field, { error }] = useField(props.name);

  if (props.items.length == 0)
    console.debug('Obtained empty data array');

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props['aria-label']}</FormLabel>

      <Field
        size={selectSize}   // pass props for select 
        as={Select}
        {...field}
        {...props}
        name={field.name}
        errors={error}
      >
        {
          props.items.map((item: any) => {
            const key = getKey(item);
            const value = getValue(item);

            return (
              <option key={key} value={key}>
                {value}
              </option>
            )
          })
        }
      </Field>

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl >
  )
}

export default SelectField