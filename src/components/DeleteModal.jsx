import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteModal = (props) => {
  const { title, projectId } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Button colorScheme="blue" mr={3}>
              Zatwierdź
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
