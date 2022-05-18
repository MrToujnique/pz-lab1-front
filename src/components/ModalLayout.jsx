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
import { IconButton } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "./../store/actions/modalLayout";
import { useNavigate } from "react-router-dom";

const ModalLayout = (props) => {
  const {
    title,
    projectId,
    projectName,
    description,
    isAddingModal,
    isEditingModal,
  } = props;

  let navigate = useNavigate();

  const createProjectSelector = useSelector((state) => state.createProject);
  const { loading, success, error, project } = createProjectSelector;
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectNameState, setProjectNameState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [dateState, setDateState] = useState(new Date());

  const initialDate = new Date();

  useEffect(() => {
    if (isEditingModal) {
      setProjectNameState(projectName);
      setDescriptionState(description);
    }
  }, []);

  const createProjectHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        name: projectNameState,
        description: descriptionState,
        dateofDelivery: dateState,
        access: "CLOSE",
        status: "CONTINUES",
        projectOwnerEmail: user.email,
        tasksIds: [],
        studentsEmails: [],
      })
    );
    navigate(`/`);
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
            {isAddingModal && (
              <Button colorScheme="blue" mr={3} onClick={createProjectHandler}>
                Zatwierdź
              </Button>
            )}
            {isEditingModal && (
              <Button colorScheme="blue" mr={3}>
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
