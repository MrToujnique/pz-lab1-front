import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalLayout from "../../ModalLayout";
import DeleteModal from "./../../DeleteModal";
import InfoModal from "../../InfoModal/InfoModal";
import { useEffect } from "react";

export const RowItem = (props) => {
  const {
    lp,
    id,
    name,
    description,
    createDate,
    thesisDefence,
    userEmail,
    ownerEmail,
  } = props;

  return (
    <Tr>
      <Td isNumeric>{lp}</Td>
      <Td isNumeric>{id}</Td>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{createDate}</Td>
      <Td>{thesisDefence}</Td>
      <Td>
        <InfoModal projectId={id} />
        {!userEmail.localeCompare(ownerEmail) ? (
          <>
            <ModalLayout
              projectId={id}
              projectName={name}
              description={description}
              thesisDefence={thesisDefence}
              isEditingModal={true}
              title="Edytowanie projektu"
            />
            <DeleteModal projectId={id} title="Usuwanie projektu" />
          </>
        ) : (
          <></>
        )}
      </Td>
    </Tr>
  );
};
