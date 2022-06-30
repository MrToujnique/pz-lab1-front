import React from "react";
import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import { useEffect, useState } from "react";
import axios from "./../axios";
import { projectEndpoints } from "../shared/config/endpoints";
import { studentEndpoints } from "../shared/config/endpoints";
import { Box, Flex, Text } from "@chakra-ui/react";
import TopBar from "./../components/TopBar/TopBar";
import { Heading } from "@chakra-ui/react";

const AvailableProjectsPage = () => {
  const formatDate = (date) => {
    const dateObject = new Date(date);
    return dateObject.toISOString().substring(0, 10);
  };

  const [isStudent, setIsStudent] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(studentEndpoints.getStudentByEmail)
      .then((resp) => {
        if (resp.status === 200) {
          setIsStudent(true);
        }
      })
      .catch(() => {
        setIsStudent(false);
      });
  });

  useEffect(() => {
    axios
      .get(projectEndpoints.getAvailableProjects, {
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
          <Heading textAlign="center">Lista wolnych projektów</Heading>
          {isStudent ? (
            <ProjectsTable
              formatDate={formatDate}
              projectsList={projectsList}
              setProjectsList={setProjectsList}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <>
              <Text textAlign="center">
                Tylko studenci mogą dołączać do projektów.
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default AvailableProjectsPage;
