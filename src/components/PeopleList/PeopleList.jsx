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
import { useEffect, useState } from "react";
import Person from "./Person/Person";
import axios from "./../../axios";
import { personEndpoints } from "./../../shared/config/endpoints";
import {
  Heading,
  Flex,
  NumberInput,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const PeopleList = () => {
  const [page, setPage] = useState(0);
  const adminToken = localStorage.getItem("adminToken");
  const [people, setPeople] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    axios
      .get(`${personEndpoints.getAllPeople}/${adminToken}`, {
        params: {
          page: page,
          size: 10,
          sort: "asc",
        },
      })
      .then((res) => {
        setPeople(res.data.content);
        setPaginationData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <>
      <Heading textAlign="center">Lista użytkowników</Heading>
      {people.length > 0 ? (
        <TableContainer mx="20px" mt="30px">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>EMAIL</Th>
                <Th>ROLA</Th>
                <Th>PRZYPISANE PROJEKTY</Th>
                <Th>MODYFIKACJA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {people.map((item, key) => (
                <Person
                  email={item.email}
                  role={item.role}
                  projects={item.ownedProjects}
                  adminToken={adminToken}
                />
              ))}
            </Tbody>
            <Flex justifyContent="center" alignItems="center">
              Numer strony:
              <NumberInput
                ml={2}
                mr={8}
                w={28}
                min={1}
                max={paginationData.totalElements}
                onChange={(value) => {
                  //const page = value ? value - 1 : 0;
                  setPage(value - 1);
                }}
                defaultValue={page + 1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </Table>
        </TableContainer>
      ) : (
        <Heading textAlign="center">Brak wyników</Heading>
      )}
    </>
  );
};

export default PeopleList;
