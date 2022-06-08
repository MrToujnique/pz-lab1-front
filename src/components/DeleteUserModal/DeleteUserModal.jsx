import React from "react";
import {
  FormControl,
  IconButton,
  List,
  ListItem,
  NumberInput,
  Textarea,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  Text,
  Input,
  ModalFooter,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import { userTypes } from "./../../shared/config/userTypes";
import axios from "./../../axios";
import { personEndpoints } from "./../../shared/config/endpoints";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteUserModal = (props) => {
  const { email, adminToken } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formSubmit = (e) => {
    e.preventDefault();
    const inputObj = {
      email: email,
      token: adminToken,
    };
    console.log(inputObj);
    axios
      .put(personEndpoints.updatePersonRole, inputObj)
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IconButton
        colorScheme="red"
        aria-label="Wyświetl"
        size="sm"
        mr="5px"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="75%" maxH="95%">
          <ModalHeader>Edycja uprawnień użytkownika {email}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Box marginTop={16}>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Zatwierdź
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
