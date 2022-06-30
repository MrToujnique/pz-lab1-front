import React from "react";
import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PermissionModal from "./../PermissionModal/PermissionModal";
import StudyTypeModal from "./../StudyTypeModal/StudyTypeModal";

const Student = (props) => {
  const { email, name, surname, indexNumber, projectsIds, studyType } = props;
  const [separatedProjects, setSeparatedProjects] = useState("");

  useEffect(() => {
    if (projectsIds) {
      setSeparatedProjects(projectsIds.join(", "));
    }
  }, []);

  return (
    <>
      <Tr>
        <Td>{email}</Td>
        <Td>{name}</Td>
        <Td>{surname}</Td>
        <Td>{indexNumber}</Td>
        <Td>{separatedProjects}</Td>
        <Td>
          {!studyType.localeCompare("STATIONARY") ? "Stacjonarne" : "Zaoczne"}
        </Td>
      </Tr>
    </>
  );
};

export default Student;
