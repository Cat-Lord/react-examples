import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <Flex
      direction={'row'}
      wrap={'nowrap'}
      justifyContent={'flex-start'}
      alignItems={'stretch'}
      gap={10}
      bg='tan'
      p={5}
    >
      <Link to="/attendance/create">New Attendance</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/statzxzcascascacsasc istics">Statistics</Link>
    </Flex>
  )
}

export default Navigation