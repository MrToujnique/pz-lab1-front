import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import { RowItem } from "./RowItem/RowItem";
import { projectEndpoints } from "../../shared/config/endpoints";
import { useEffect } from "react";

export const ProjectsList = (props) => {
  let mayOf12 = new Date("2022-06-12");
  const thesisDefence = mayOf12.toISOString().substring(0, 10);

  useEffect(() => {
    console.log("thesisDefence: ", thesisDefence);
  }, []);

  return (
    <>
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
              id={8}
              name={
                "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
              }
              description={"Cos tam cos tam"}
              createDate={"12 Maj 2021"}
              thesisDefence={thesisDefence}
            />
            <RowItem
              lp={1}
              id={8}
              name={
                "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
              }
              description={"Cos tam cos tam"}
              createDate={"12 Maj 2021"}
              thesisDefence={thesisDefence}
            />
            <RowItem
              lp={1}
              id={8}
              name={
                "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
              }
              description={"Cos tam cos tam"}
              createDate={"12 Maj 2021"}
              thesisDefence={thesisDefence}
            />
            <RowItem
              lp={1}
              id={8}
              name={
                "Juan Pablo Fernandez Maria FC Barcelona Janusz Sergio Vasilii Szewczenko"
              }
              description={"Cos tam cos tam"}
              createDate={"12 Maj 2021"}
              thesisDefence={thesisDefence}
            />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
