import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalLayout from "../../ModalLayout";
import DeleteModal from "./../../DeleteModal";
import InfoModal from "../../InfoModal/InfoModal";
import { useEffect } from "react";

export const RowItem = (props) => {
  const { lp, isAdmin, userEmail, projectData } = props;
  const {
    projectId,
    name,
    description,
    dataAndTimeOfCreation,
    dateOfDelivery,
    projectOwnerEmail,
  } = projectData;

  const formatDate = (date) => {
    const dateObject = new Date(date);
    return dateObject.toISOString().substring(0, 10);
  };

  console.log(projectData);

  return (
    <Tr>
      <Td isNumeric>{lp}</Td>
      <Td isNumeric>{projectId}</Td>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{formatDate(dataAndTimeOfCreation)}</Td>
      <Td>{formatDate(dateOfDelivery)}</Td>
      <Td>
        <InfoModal projectId={projectId} />
        {!userEmail.localeCompare(projectOwnerEmail) || isAdmin ? (
          <>
            <ModalLayout
              projectData={projectData}
              isEditingModal={true}
              title="Edytowanie projektu"
            />
            <DeleteModal projectId={projectId} title="Usuwanie projektu" />
          </>
        ) : (
          <></>
        )}
      </Td>
    </Tr>
  );
};
