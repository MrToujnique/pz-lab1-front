import { Box, Flex, Table,Thead,Tbody,Tr,Th,TableContainer } from "@chakra-ui/react";
import { RowItem } from "../components/ProjectsList/RowItem/RowItem";
import React, { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { ProjectsList } from "../components/ProjectsList/ProjectsList";
import { projectEndpoints } from "../shared/config/endpoints";
import axios from "../axios";

const ProjectList = (props) => {

  const formatDate = (date)=>{
    let dateObject = new Date(date);
    return dateObject.toISOString().substring(0,10);
  }

  let mayOf12 = new Date("2022-06-12");
  const thesisDefence = mayOf12.toISOString().substring(0, 10);

  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    axios
    .get(projectEndpoints.getProjectsList,{
        params:{
            page:0,
            size:10,
            sort:'asc'
        }
    })
    .then((resp) => {
        setProjectsList(resp.data.content);
    })
    .catch((err) => {
      console.log(err.response)
    });

  }, [])
  


  return (
    <>
      <Box>
        <Flex
          direction="column"
          width="100%"
          left="0px"
          top="0px"
        >
          <TopBar/>
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
                {projectsList.map((item, key) => 
                  <RowItem
                  key={item.projectId}
                  lp={key}
                  id={item.projectId}
                  name={item.name}
                  description={item.description}
                  createDate={formatDate(item.dataAndTimeOfCreation)}
                  thesisDefence={formatDate(item.dateOfDelivery)}
                />
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
};

export default ProjectList;