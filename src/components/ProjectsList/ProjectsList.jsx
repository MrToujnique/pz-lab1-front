import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { RowItem } from "./RowItem/RowItem";

export const ProjectsList = (props) => {
  return (
    <TableContainer mx="20px" mt="30px">
      <Table size="sm">
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
          <RowItem
            lp={1}
            id={1}
            name={
              "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
            }
            description={"Cos tam cos tam"}
            createDate={"12 Maj 2021"}
            thesisDefence={"03 Marzec 2022"}
          />
          <RowItem
            lp={1}
            id={1}
            name={
              "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
            }
            description={"Cos tam cos tam"}
            createDate={"12 Maj 2021"}
            thesisDefence={"03 Marzec 2022"}
          />
          <RowItem
            lp={1}
            id={1}
            name={
              "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
            }
            description={"Cos tam cos tam"}
            createDate={"12 Maj 2021"}
            thesisDefence={"03 Marzec 2022"}
          />
          <RowItem
            lp={1}
            id={1}
            name={
              "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
            }
            description={"Cos tam cos tam"}
            createDate={"12 Maj 2021"}
            thesisDefence={"03 Marzec 2022"}
          />
        </Tbody>
      </Table>
    </TableContainer>
  );
};
