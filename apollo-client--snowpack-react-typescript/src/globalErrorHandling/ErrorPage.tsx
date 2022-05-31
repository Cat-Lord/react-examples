import { Center, Container, Image, Text } from '@chakra-ui/react'
import React from 'react'

type ErrorPageProps = {
  errorMessage: string
  fontSize?: string
  boxSize?: string
}

const errorImageLinks = [
  "https://thumbs.dreamstime.com/b/confused-golden-fish-confused-expression-golden-fish-174754095.jpg",
  "https://d6ce0no7ktiq.cloudfront.net/images/preview/2019/03/28/design-39545/template-sticker-600x600.png",
  "https://images.clipartlogo.com/files/istock/previews/9507/95070993-cartoon-drawing-fish-confuse.jpg",
  "https://media.istockphoto.com/vectors/cute-confused-fish-emoticon-emoji-smiley-vector-illustration-vector-id1136848638?k=20&m=1136848638&s=170667a&w=0&h=t-1ePKMulYlCgYVfj7hnUyfHwJgKysEp55hFAfSw47w="
]

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  return (
    <Container boxSize={props?.boxSize} flexDirection={'column'} >
      <Text fontSize={props.fontSize ?? '6xl'}>{props.errorMessage}</Text>
      <Image
        src={
          errorImageLinks[
          Math.floor(Math.random() * errorImageLinks.length)
          ]
        }
        alt='Error has occurred Image' />
    </Container>
  )
}

export default ErrorPage