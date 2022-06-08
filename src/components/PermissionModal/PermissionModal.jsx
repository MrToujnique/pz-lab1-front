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
import { useNavigate } from "react-router-dom";

const PermissionModal = (props) => {
  const { email, role, adminToken } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState(role);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedRole(role);
  }, [isOpen]);

  const formSubmit = (e) => {
    e.preventDefault();
    const inputObj = {
      email: email,
      token: adminToken,
      role: selectedRole,
    };
    console.log(inputObj);
    axios
      .put(personEndpoints.updatePersonRole, inputObj)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IconButton
        colorScheme="yellow"
        aria-label="Wyświetl"
        size="sm"
        mr="5px"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="75%" maxH="95%">
          <ModalHeader>Edycja uprawnień użytkownika {email}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <form onSubmit={formSubmit}>
                <Select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  {Object.values(userTypes).map((item, key) => (
                    <option>{item}</option>
                  ))}
                </Select>
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
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PermissionModal;
