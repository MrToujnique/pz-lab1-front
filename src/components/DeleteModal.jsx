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

const DeleteModal = (props) => {
  const { activity, title, firstActivity, secondActivity, projectId } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{activity}</Button>

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
              {firstActivity}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              {secondActivity}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
