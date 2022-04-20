import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { RowItem } from './RowItem/RowItem'

export const ProjectsList = (props) => {

  return (
    <TableContainer mx='20px'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>L.p.</Th>
            <Th>ID</Th>
            <Th>NAZWA</Th>
            <Th>OPIS</Th>
            <Th>UTWORZONY</Th>
            <Th>DATA OBRONY</Th>
            <Th>EDYCJA</Th>
          </Tr>
        </Thead>
        <Tbody>
          <RowItem/>
          <RowItem/>
          <RowItem/>
          <RowItem/>
          <RowItem/>
          <RowItem/>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
