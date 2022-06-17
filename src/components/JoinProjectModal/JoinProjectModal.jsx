import React from "react";
import { Button, Flex, IconButton, ModalFooter } from "@chakra-ui/react";
import { useDisclosure, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "./../../axios";
import { studentEndpoints } from "../../shared/config/endpoints";

const JoinProjectModal = (props) => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const { projectId, projectName, projectOwnerEmail } = props;
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setId(projectId);
      setName(projectName);
      setOwnerEmail(projectOwnerEmail);
    }
  }, [isOpen]);

  const handleAddToProject = (e) => {
    axios
      .put(`${studentEndpoints.joinStudentToProject}${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Wyświetl"
        size="sm"
        mr="5px"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="75%" maxH="95%">
          <ModalHeader textAlign="center">
            Czy chcesz dołączyć do tego projektu?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center">
              <Text>Dane projektu:</Text>
              <Text>Identyfikator: {id}</Text>
              <Text>Nazwa projektu: {name}</Text>
              <Text>Prowadzący: {ownerEmail}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex direction="row" alignItems="center" justifyItems="center">
              <Button colorScheme="green" mr={3} onClick={handleAddToProject}>
                Zatwierdź
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Anuluj
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinProjectModal;
