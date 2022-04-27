import React from 'react'
import {Tr, Td, IconButton} from '@chakra-ui/react';
import { InfoOutlineIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export const RowItem = (props) => {
    const {
        lp,
        id,
        name,
        description,
        createDate,
        thesisDefence,
    }=props;

  return (
    <Tr>
        <Td isNumeric>{lp}</Td>
        <Td isNumeric>{id}</Td>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td>{createDate}</Td>
        <Td>{thesisDefence}</Td>
        <Td>
          <IconButton        
        colorScheme='green'
        aria-label='Wyświetl'
        size='sm'
        mr='5px'
        icon={<InfoOutlineIcon/>}/>
          <IconButton        
        colorScheme='yellow'
        size='sm'
        mr='5px'
        aria-label='Edytuj'
        icon={<EditIcon/>}/>
          <IconButton        
        colorScheme='red'
        size='sm'
        aria-label='Usuń'
        icon={<DeleteIcon/>}/>
        </Td>
    </Tr>
  )
}
