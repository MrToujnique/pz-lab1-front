import React from "react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import TopBar from "./../TopBar/TopBar";
import { Spinner } from "@chakra-ui/react";
import { TableContainer } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { Thead } from "@chakra-ui/react";
import { Tr } from "@chakra-ui/react";
import { Th } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";
import { RowItem } from "./../ProjectsList/RowItem/RowItem";
import AvailableProjectItem from "./AvailableProjectItem";
import { Heading, Text } from "@chakra-ui/react";

const ProjectsTable = (props) => {
  const { loading, setLoading, projectsList, setProjectsList, formatDate } =
    props;
  return (
    <>
      <Box>
        <Flex direction="column" width="100%" left="0px" top="0px">
          <TopBar />
          <Heading textAlign="center">Lista wolnych projektów</Heading>
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
                    <Th>E-MAIL PROWADZĄCEGO</Th>
                    <Th>AKCJE</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projectsList.map((item, key) => (
                    <AvailableProjectItem
                      key={item.projectId}
                      lp={key}
                      id={item.projectId}
                      name={item.name}
                      description={item.description}
                      createDate={formatDate(item.dataAndTimeOfCreation)}
                      thesisDefence={item.dateOfDelivery}
                      projectOwnerEmail={item.projectOwnerEmail}
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

export default ProjectsTable;
