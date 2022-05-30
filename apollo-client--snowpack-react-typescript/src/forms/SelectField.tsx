import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'
import { Field, useField } from 'formik';
import React, { SelectHTMLAttributes } from 'react'

type SelectFieldProps<T> = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;

  items: T[];

  // callbacks
  onSelectionChange?: (selectedItem: T) => any;
  getKey: (item: T) => string;
  getValue: (item: T) => string;
};

const SelectField: React.FC<SelectFieldProps<any>> = ({ size: _size, ...props }) => {
  const [field, { error }] = useField(props.name);

  if (props.items.length == 0)
    console.debug('Obtained empty data array');

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props['aria-label']}</FormLabel>

      <Field
        as={Select}
        {...field}
        name={field.name}
        errors={error}
      >
        {
          props.items.map((item: any) => {
            const key = props.getKey(item);
            const value = props.getValue(item);

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