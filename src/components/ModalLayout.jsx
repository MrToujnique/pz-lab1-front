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
import axios from "./../axios";
import { projectEndpoints } from "../shared/config/endpoints";

const ModalLayout = (props) => {
  const { title, projectData, isAddingModal, isEditingModal } = props;
  console.log("props: ", props);
  const {
    projectId,
    name,
    description,
    dataAndTimeOfCreation,
    access,
    status,
    dataAndTimeOfUpdate,
    dateOfDelivery,
    projectOwnerEmail,
    tasksIds,
    studentsEmails,
  } = projectData;

  const initialDate = new Date();
  const dateTimeToday = initialDate.toISOString();
  const today = dateTimeToday.substring(0, 10);
  const dateOfThesisDefence = new Date(dateOfDelivery);
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
  const [actualProject, setActualProject] = useState();

  useEffect(() => {
    console.log("data obrony: ", dateOfDelivery);
    console.log("dateState: ", dateState);
    setStatusState();
    if (dateOfDelivery >= today) {
      setDateState(dateOfThesisDefence);
    } else if (dateOfDelivery < today) {
      setDateState(initialDate);
    }
    if (isOpen) {
      axios
        .get(`${projectEndpoints.getProject}${projectId}`)
        .then((res) => {
          console.log(res.data.status);
          console.log(res.data.access);
          setActualProject(res.data);
          setProjectNameState(name);
          setDescriptionState(description);
          setStatusState(
            !res.data.status.localeCompare("CONTINUES")
              ? "Trwający"
              : "Zamknięty"
          );
          setAccessState(
            !res.data.access.localeCompare("OPEN") ? "Otwarty" : "Zamknięty"
          );
        })
        .catch((err) => console.log(err));
    }
  }, [isOpen]);

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
    window.location.reload(false);
  };

  const editProjectHandler = (e) => {
    e.preventDefault();
    const projectDetails = {
      //to jest dobry obiekt, znajdź i wstaw wszystkie potrzebne dane do tych pól
      //jak to zrobisz to apka raczej fertig
      projectId: projectId,
      name: projectNameState,
      description: descriptionState,
      dataAndTimeOfCreation: dateTimeToday,
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
      dataAndTimeOfUpdate: dateTimeToday,
      dateOfDelivery: dateState,
      projectOwnerEmail: actualProject.projectOwnerEmail,
      tasksIds: actualProject.tasksIds,
      studentsEmails: actualProject.studentsEmails,
    };
    //dispatch(updateProject(projectDetails));
    axios
      .put(projectEndpoints.putProject, projectDetails)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
    onClose();
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
