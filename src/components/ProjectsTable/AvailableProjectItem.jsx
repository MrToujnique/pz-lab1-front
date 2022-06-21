import { Td, Tr } from "@chakra-ui/react";
import React from "react";
import JoinProjectModal from "../JoinProjectModal/JoinProjectModal";

const AvailableProjectItem = (props) => {
  const {
    lp,
    id,
    name,
    description,
    createDate,
    thesisDefence,
    projectOwnerEmail,
  } = props;

  return (
    <>
      <Tr>
        <Td isNumeric>{lp + 1}</Td>
        <Td isNumeric>{id}</Td>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td>{createDate}</Td>
        <Td>{thesisDefence}</Td>
        <Td>{projectOwnerEmail}</Td>
        <Td>
          <JoinProjectModal
            projectId={id}
            projectName={name}
            projectOwnerEmail={projectOwnerEmail}
          />
        </Td>
      </Tr>
    </>
  );
};

export default AvailableProjectItem;
