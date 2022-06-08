import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <Flex
      direction={'row'}
      wrap={'nowrap'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      gap={7}
      bg='teal'
      p={3}
      fontSize='2xl'
    >
      <Link to="/">
        <Image
          src="https://www.srzbanovce.sk/image/srz_logo_3d.png"
          alt='MO-SRZ Logo'
          w="70px"
          h="auto" />
      </Link>
      <Link to="/attendance/create">New Attendance</Link>
      <Link to="/statistics">Statistics</Link>
    </Flex>
  )
}

export default Navigation