import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalLayout from "../../ModalLayout";
import DeleteModal from "./../../DeleteModal";
import InfoModal from "../../InfoModal/InfoModal";

export const RowItem = (props) => {
  const { lp, id, name, description, createDate, thesisDefence } = props;

  return (
    <Tr>
      <Td isNumeric>{lp}</Td>
      <Td isNumeric>{id}</Td>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{createDate}</Td>
      <Td>{thesisDefence}</Td>
      <Td>
        <InfoModal />
        <ModalLayout
          projectId={id}
          projectName={name}
          description={description}
          isEditingModal={true}
          title="Edytowanie projektu"
        />
        <DeleteModal title="Usuwanie projektu" />
      </Td>
    </Tr>
  );
};
