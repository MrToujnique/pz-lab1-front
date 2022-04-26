import { Flex, Input, Button } from '@chakra-ui/react'
import React from 'react'

export const SearchBar = () => {
  return (
    <Flex>
        <Input placeholder='Hello' size='md' bgColor='white'/>
        <Button colorScheme='teal' size='md' ml='10px'>
            SZUKAJ
        </Button>
    </Flex>
  )
}
