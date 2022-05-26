import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import InputField from './forms/InputField';
import SelectField from './forms/SelectField';

type Some = {
  id: string
  name: string
  other: number
}

type TableSome = {
  some: Some
  num1: number
  num2: number
}

function Home() {

  const [tableItems, setTableItems] = useState<TableSome[]>([]);

  const options: any[] = [
    { id: "1", name: "name-1-x", other: 1 },
    { id: "2", name: "name-2-x", other: 2 },
    { id: "3", name: "name-3-x", other: 3 },
    { id: "4", name: "name-4-x", other: 4 },
    { id: "5", name: "name-5-x", other: 5 },
    { id: "6", name: "name-6-x", other: 6 },
  ]

  return (
    <Formik
      initialValues={{
        homeOption: "1",
        num1: 0,
        num2: 0
      }}
      onSubmit={
        (values) => {
          console.log('submitting');
          console.log(values);
          const it = options.find((opt) => opt.id == values.homeOption)
          setTableItems((items) => [...items, {
            some: it,
            num1: values.num1,
            num2: values.num2
          }])
        }
      }>
      {() => (
        <Form>
          <SelectField
            name="homeOption"
            aria-label='Select Option'
            items={options}
            getKey={(option: Some) => option.id}
            getValue={(option: Some) => option.id + ": " + option.name}
          />

          <InputField
            name='num1'
            type={'number'}
            placeholder='number of fish caught'
            aria-label='Number of Fish Caught'
            required
          />

          <InputField
            name='num2'
            type={'number'}
            placeholder='total weight of fish caught'
            aria-label='Total Weight of Fish Caught'
            required
          />


          <TableContainer>
            <Table >
              <Thead>
                <Tr>
                  <Th w='60'>ID</Th>
                  <Th w='20'>Name</Th>
                  <Th w='20' isNumeric>Other</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  tableItems.map((option: TableSome) => {
                    console.log('adding table item');
                    console.log(option);
                    return (
                      <Tr key={option.some.id}>
                        <Td key={1}>{option.some.name}</Td>
                        <Td key={2}>{option.num1}</Td>
                        <Td key={3} isNumeric>{option.num2}</Td>
                      </Tr>
                    )
                  })
                }
              </Tbody>
            </Table>
          </TableContainer>

          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Formik >
  )
}

export default Home