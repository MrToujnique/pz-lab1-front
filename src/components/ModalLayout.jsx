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
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const ModalLayout = (props) => {
  const {
    activity,
    title,
    firstActivity,
    secondActivity,
    projectId,
    projectName,
    description,
    isEditingModal,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectNameState, setProjectNameState] = useState(projectName);
  const [descriptionState, setDescriptionState] = useState(description);
  const [dateState, setDateState] = useState(new Date());

  const initialDate = new Date();

  return (
    <>
      <Button onClick={onOpen}>{activity}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              {isEditingModal && (
                <Box>
                  <Text>ID: {projectId || ""}</Text>
                </Box>
              )}
              <Box>
                <Text>Nazwa:</Text>
                <Input
                  value={projectNameState || ""}
                  onChange={(e) => setProjectNameState(e.target.value)}
                />
              </Box>
              <Box>
                <Text>Data oddania:</Text>
                <DatePicker
                  selected={dateState}
                  onChange={(date) => setDateState(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={
                    new Date(
                      initialDate.getFullYear(),
                      initialDate.getMonth(),
                      initialDate.getDate()
                    )
                  }
                  maxDate={
                    new Date(
                      initialDate.getFullYear() + 5,
                      initialDate.getMonth(),
                      initialDate.getDate()
                    )
                  }
                />
              </Box>
              <Box>
                <Text>Opis:</Text>
                <Textarea
                  size="sm"
                  value={descriptionState || ""}
                  onChange={(e) => setDescriptionState(e.target.value)}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              {firstActivity}
            </Button>
            <Button onClick={onClose}>{secondActivity}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLayout;
