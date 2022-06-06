import React from 'react'

type SomePageProps = {
  message: string
}

const SomePage: React.FC<SomePageProps> = (props) => {
  return (
    <div>
      <h2>{props.message}</h2>
    </div>
  )
}

export default SomePage