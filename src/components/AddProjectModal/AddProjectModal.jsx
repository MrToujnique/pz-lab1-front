import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "./../../store/actions/projectActions";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Box,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { projectStatus } from "../../shared/config/statusTypes";
import { projectAccess } from "../../shared/config/accessTypes";
import { Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import axios from "./../../axios";

const AddProjectModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const initialDate = new Date();
  const dateTimeToday = initialDate.toISOString();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dateState, setDateState] = useState(initialDate);
  const [projectNameState, setProjectNameState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [statusState, setStatusState] = useState("Trwający");
  const [accessState, setAccessState] = useState("Otwarty");

  const createProjectHandler = (e) => {
    console.log("Data dostarczenia: ", dateState);
    e.preventDefault();
    dispatch(
      createProject({
        name: projectNameState,
        description: descriptionState,
        dateOfDelivery: dateState.toISOString().substring(0, 10),
        access: !accessState.localeCompare("Otwarty")
          ? "OPEN"
          : !accessState.localeCompare("Zamknięty")
          ? "CLOSE"
          : null,
        status: !statusState.localeCompare("Trwający")
          ? "CONTINUES"
          : !statusState.localeCompare("Zamknięty")
          ? "CLOSE"
          : null,
        projectOwnerEmail: email,
        tasksIds: [],
        studentsEmails: [],
      })
    );
    navigate(`/`);
    onClose();
  };

  return (
    <>
      <IconButton
        colorScheme="green"
        size="sm"
        mr="5px"
        aria-label="Dodaj"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodawanie projektu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Box>
                <Text>Nazwa:</Text>
                <Input
                  value={projectNameState || ""}
                  maxLength={50}
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
                />
              </Box>
              <Box>
                <Text>Opis:</Text>
                <Textarea
                  size="sm"
                  value={descriptionState || ""}
                  maxLength={100}
                  onChange={(e) => setDescriptionState(e.target.value)}
                />
              </Box>
              <Box>
                <Text>Status projektu:</Text>
                <Select
                  value={statusState}
                  onChange={(e) => setStatusState(e.target.value)}
                >
                  {Object.values(projectStatus).map((item) => (
                    <option>{item}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text>Dostęp do projektu:</Text>
                <Select
                  value={accessState}
                  onChange={(e) => setAccessState(e.target.value)}
                >
                  {Object.values(projectAccess).map((item) => (
                    <option>{item}</option>
                  ))}
                </Select>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createProjectHandler}>
              Zatwierdź
            </Button>
            <Button onClick={onClose}>Anuluj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProjectModal;
