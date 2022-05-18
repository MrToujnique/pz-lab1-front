import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { ProjectsList } from "../components/ProjectsList/ProjectsList";
import { connect } from "react-redux";
import * as actions from "../store/actions/index"; 

const ProjectList = (props) => {

  const{
    fetchProjectsList
  } =props;

  fetchProjectsList();

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

const mapStateToProps = (state) => {
  return {
    projectList: state.projectList.projectsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectsList:()=>dispatch(actions.fetchProjectsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);