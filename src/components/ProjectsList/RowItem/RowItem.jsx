import React from 'react'
import {Tr, Td} from '@chakra-ui/react';

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
        <Td>{lp}</Td>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td>{createDate}</Td>
        <Td>{thesisDefence}</Td>
        <Td>25.4</Td>
    </Tr>
  )
}
