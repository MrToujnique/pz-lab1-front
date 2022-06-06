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
  Select,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "./../store/actions/projectActions";
import { useNavigate } from "react-router-dom";
import { updatePersonEmail } from "./../store/actions/personActions";
import { updateProject } from "./../store/actions/projectActions";
import { projectStatus } from "../shared/config/statusTypes";
import { projectAccess } from "../shared/config/accessTypes";

const ModalLayout = (props) => {
  const {
    title,
    projectId,
    projectName,
    description,
    thesisDefence,
    isAddingModal,
    isEditingModal,
  } = props;

  const initialDate = new Date();
  const today = initialDate.toISOString().substring(0, 10);
  const dateOfThesisDefence = new Date(thesisDefence);
  // let dd = String(initialDate.getDate()).padStart(2, "0");
  // let mm = String(initialDate.getMonth() + 1).padStart(2, "0");
  // let yyyy = initialDate.getFullYear();

  // initialDate = yyyy + "-" + mm + "-" + dd;

  let navigate = useNavigate();

  const createProjectSelector = useSelector((state) => state.createProject);
  const { loading, success, error, project } = createProjectSelector;
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectNameState, setProjectNameState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [dateState, setDateState] = useState(initialDate);
  const [statusState, setStatusState] = useState("Trwający");
  const [accessState, setAccessState] = useState("Otwarty");

  useEffect(() => {
    console.log("data obrony: ", thesisDefence);
    console.log("dateState: ", dateState);
    if (isEditingModal) {
      setProjectNameState(projectName);
      setDescriptionState(description);
    }
    if (thesisDefence >= today) {
      setDateState(dateOfThesisDefence);
    } else if (thesisDefence < today) {
      setDateState(initialDate);
    }
  }, []);

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
  };

  const editProjectHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        email: email,
        projectId: projectId,
        status: !statusState.localeCompare("Trwający")
          ? "CONTINUES"
          : !statusState.localeCompare("Zamknięty")
          ? "CLOSE"
          : null,
        name: projectNameState,
        description: descriptionState,
        access: !accessState.localeCompare("Otwarty")
          ? "OPEN"
          : !accessState.localeCompare("Zamknięty")
          ? "CLOSE"
          : null,
      })
    );
  };

  return (
    <>
      {isAddingModal && (
        <IconButton
          colorScheme="green"
          size="sm"
          mr="5px"
          aria-label="Dodaj"
          icon={<AddIcon />}
          onClick={onOpen}
        />
      )}
      {isEditingModal && (
        <IconButton
          colorScheme="yellow"
          size="sm"
          mr="5px"
          aria-label="Edytuj"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      )}
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
            {isAddingModal && (
              <Button colorScheme="blue" mr={3} onClick={createProjectHandler}>
                Zatwierdź
              </Button>
            )}
            {isEditingModal && (
              <Button colorScheme="green" mr={3} onClick={editProjectHandler}>
                Zatwierdź
              </Button>
            )}
            <Button onClick={onClose}>Anuluj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLayout;
