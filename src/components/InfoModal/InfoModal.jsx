import React from "react";
import { IconButton, List, ListItem, Textarea } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { useState } from "react";
import TaskItem from "./TaskItem";

const InfoModal = (props) => {
  const user = {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  };

  const { projectId } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tasklist, setTaskList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = dd + "." + mm + "." + yyyy;

  const AddTask = () => {
    if (name !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        description: description,
        isCompleted: false,
        date: today,
      };

      setTaskList([...tasklist, taskDetails]);
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
  };

  // const taskCompleted = (e, id) => {
  //   e.preventDefault();
  //   //let's find index of element
  //   const element = tasklist.findIndex((elem) => elem.id == id);

  //   //copy array into new variable
  //   const newTaskList = [...tasklist];

  //   //edit our element
  //   newTaskList[element] = {
  //     ...newTaskList[element],
  //     isCompleted: true,
  //   };

  //   setTaskList(newTaskList);
  // };

  return (
    <>
      <IconButton
        colorScheme="green"
        aria-label="Wyświetl"
        size="sm"
        mr="5px"
        icon={<InfoOutlineIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="75%" maxH="90%">
          <ModalHeader>Lista zadań</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              {user.user.role === "ADMIN" && (
                <>
                  <Input
                    type="text"
                    name="text"
                    id="text"
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                    placeholder="Wprowadź nazwę zadania (maks. 50 znaków)"
                  />
                  <Textarea
                    type="text"
                    name="text"
                    id="text"
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                    placeholder="Wprowadź opis zadania (maks. 100 znaków)"
                  />
                  <Button onClick={AddTask}>Dodaj zadanie</Button>
                </>
              )}
              <br />
              {tasklist !== [] ? (
                <TableContainer mx="20px" mt="30px">
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>L.p.</Th>
                        <Th>ID</Th>
                        <Th>NAZWA</Th>
                        <Th>OPIS</Th>
                        <Th>UTWORZONE</Th>
                        {user.user.role === "ADMIN" && <Th>EDYCJA</Th>}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tasklist.map((t) => (
                        // <ListItem
                        //   className={t.isCompleted ? "crossText" : "listitem"}
                        // >
                        //   {t.value}
                        // </ListItem>

                        <TaskItem
                          orderNumber={t.id}
                          taskId={t.id}
                          name={t.name}
                          description={t.description}
                          dateTimeAdded={t.date}
                          deletetask={deletetask}
                          user={user}
                        />
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
