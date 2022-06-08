import React from "react";
import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PermissionModal from "./../PermissionModal/PermissionModal";
import StudyTypeModal from "./../StudyTypeModal/StudyTypeModal";

const Student = (props) => {
  const { email, name, surname, indexNumber, projectIds, studyType } = props;
  const [separatedProjects, setSeparatedProjects] = useState("");

  useEffect(() => {
    if (projectIds) {
      setSeparatedProjects(projectIds.join(", "));
    }
  }, []);

  return (
    <>
      <Tr>
        <Td>{email}</Td>
        <Td>{name}</Td>
        <Td>{surname}</Td>
        <Td>{indexNumber}</Td>
        <Td>{projectIds}</Td>
        <Td>
          {!studyType.localeCompare("STATIONARY") ? "Stacjonarne" : "Zaoczne"}
        </Td>
        {/* <StudyTypeModal indexNumber={indexNumber} /> */}
        {/* <DeleteUserModal /> */}
        {/* <ModalLayout
          projectId={id}
          projectName={name}
          description={description}
          thesisDefence={thesisDefence}
          isEditingModal={true}
          title="Edytowanie projektu"
        />
        <DeleteModal projectId={id} title="Usuwanie projektu" /> */}
        {/* </Td> */}
      </Tr>
    </>
  );
};

export default Student;
