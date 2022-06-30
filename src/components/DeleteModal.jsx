import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "../axios";
import { projectEndpoints } from "../shared/config/endpoints";

const DeleteModal = (props) => {
  const { title, projectId } = props;
  const email = localStorage.getItem("email");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteProjectHandler = (e) => {
    e.preventDefault();
    axios
      .delete(projectEndpoints.deleteProject, {
        data: {
          projectId: projectId,
        },
      })
      .then((res) => {
        onClose();
        window.location.reload(false);
      });
  };

  return (
    <>
      <IconButton
        colorScheme="red"
        size="sm"
        aria-label="Usuń"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Czy chcesz usunąć projekt o ID: {projectId}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteProjectHandler}>
              Usuń
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Anuluj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
