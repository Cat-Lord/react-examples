import React from 'react'

type SelectProps = {
  options: string[]
}

const Select: React.FC<SelectProps> = (props) => {
  if (props.options?.length === 0)
    return null;

  return (
    <select>
      {
        props.options.map((option) => {
          return <option key={option} value={option}>{option}</option>
        })
      }
    </select>
  )
}

export default Select