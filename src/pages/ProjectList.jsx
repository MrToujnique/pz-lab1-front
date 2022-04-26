import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { ProjectsList } from "../components/ProjectsList/ProjectsList";

export const ProjectList = () => {
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
          <ProjectsList/>
        </Flex>
      </Box>
    </>
  );
};
