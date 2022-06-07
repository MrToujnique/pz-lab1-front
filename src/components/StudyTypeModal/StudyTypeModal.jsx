import React from "react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Flex,
  Select,
  Box,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { studyTypes } from "./../../shared/config/studyTypes";
import { studentEndpoints } from "../../shared/config/endpoints";
import axios from "./../../axios";

const StudyTypeModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { indexNumber } = props;
  const [selectedType, setSelectedType] = useState("");

  const formSubmit = (e) => {
    const inputData = {
      studyType: !selectedType.localeCompare("Stacjonarne")
        ? "STATIONARY"
        : "EXTRAMURAL",
    };
    console.log(inputData);
    e.preventDefault();
    axios
      .put(
        studentEndpoints.updateStudyType,
        !selectedType.localeCompare("Stacjonarne") ? "STATIONARY" : "EXTRAMURAL"
      )
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
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
          <ModalHeader>
            Edycja trybu studiów studenta o numerze indeksu: {indexNumber}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <form onSubmit={formSubmit}>
                <Select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                  }}
                >
                  {Object.values(studyTypes).map((item, key) => (
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

export default StudyTypeModal;
