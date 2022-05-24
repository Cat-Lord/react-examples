import { Center, Image, Text } from '@chakra-ui/react'
import React from 'react'

function NotFound() {
  return (
    <Center h='100vh' flexDirection={'column'} alignItems={'center'}>
      <Text fontSize='6xl'>Page not found...</Text>
      <Image src='https://d6ce0no7ktiq.cloudfront.net/images/preview/2019/03/28/design-39545/template-sticker-600x600.png'
        alt='page not found image' />
    </Center>
  )
}

export default NotFound