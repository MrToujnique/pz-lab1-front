import React from "react";
import {
  Heading,
  Flex,
  NumberInput,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import Student from "./Student";
import { useEffect } from "react";
import axios from "./../../axios";
import { studentEndpoints } from "../../shared/config/endpoints";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [page, setPage] = useState(0);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get(`${studentEndpoints.getAllStudents}/${adminToken}`, {
        params: {
          page: page,
          size: 10,
          sort: "asc",
        },
      })
      .then((res) => {
        setStudents(res.data.content);
        setPaginationData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {console.log("studenty:", students)}
      {console.log("paginacja:", paginationData)}
      <Heading textAlign="center">Lista studentów</Heading>
      {students.length > 0 ? (
        <TableContainer mx="20px" mt="30px">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>EMAIL</Th>
                <Th>IMIĘ</Th>
                <Th>NAZWISKO</Th>
                <Th>INDEKS</Th>
                <Th>PROJEKTY (ID)</Th>
                <Th>TRYB STUDIÓW</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((item, key) => (
                <Student
                  email={item.email}
                  name={item.name}
                  surname={item.surname}
                  indexNumber={item.index_number}
                  projectIds={item.projectIds}
                  studyType={item.studyType}
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

export default StudentList;
