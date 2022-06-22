import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { RowItem } from "../components/ProjectsList/RowItem/RowItem";
import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar/TopBar";
import { projectEndpoints } from "../shared/config/endpoints";
import axios from "../axios";
import { Heading } from "@chakra-ui/react";

const ProjectList = (props) => {
  const userEmail = localStorage.getItem("email");

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = !localStorage.getItem("role").localeCompare("ADMIN");

  useEffect(() => {
    axios
      .get(projectEndpoints.getProjectsList, {
        params: {
          page: 0,
          size: 10,
          sort: "asc",
        },
      })
      .then((resp) => {
        setLoading(false);
        console.log(resp.data.content);
        setProjectsList(resp.data.content);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <Box>
        <Flex direction="column" width="100%" left="0px" top="0px">
          <TopBar />
          {isAdmin ? (
            <Heading textAlign="center">Lista projektów</Heading>
          ) : (
            <Heading textAlign="center">Lista Twoich projektów</Heading>
          )}
          {loading ? (
            <Spinner mx="auto" my="auto" />
          ) : projectsList.length > 0 ? (
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
                  {projectsList.map((item, key) => (
                    <RowItem
                      key={item.projectId}
                      lp={key + 1}
                      isAdmin={isAdmin}
                      projectData={item}
                      userEmail={userEmail}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Flex marginTop={16} direction="column" align="center">
              <Text fontSize="2xl">Brak dostępnych projektów</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ProjectList;
