import React from "react";
import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import PermissionModal from "../../PermissionModal/PermissionModal";
import DeleteUserModal from "../../DeleteUserModal/DeleteUserModal";

const Person = (props) => {
  const { email, role, projects, adminToken } = props;
  const [separatedProjects, setSeparatedProjects] = useState("");

  useEffect(() => {
    setSeparatedProjects(projects.join(", "));
  }, []);

  return (
    <>
      <Tr>
        <Td>{email}</Td>
        <Td>{role}</Td>
        <Td>{separatedProjects}</Td>
        <Td>
          <PermissionModal email={email} role={role} adminToken={adminToken} />
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
        </Td>
      </Tr>
    </>
  );
};

export default Person;
