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
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./../../store/actions/taskActions";
import { addTask } from "./../../store/actions/taskActions";
import axios from "./../../axios";
import {
  projectEndpoints,
  taskEndpoints,
} from "./../../shared/config/endpoints";

const InfoModal = (props) => {
  const email = localStorage.getItem("email");
  const { projectId } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [page, setPage] = useState(0);
  const [projectOwnerEmail, setProjectOwnerEmail] = useState("");
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = dd + "." + mm + "." + yyyy;

  const listTasks = useSelector((state) => state.getTasks);
  const { loading, success, error, tasks } = listTasks;

  useEffect(() => {
    if (isOpen) {
      //dispatch(getTasks(projectId));
      axios
        .get(`${taskEndpoints.getTasksByProject}${projectId}`, {
          params: {
            page: page,
            size: 4,
            sort: "asc",
          },
        })
        .then((res) => {
          setTaskList(res.data.content);
          setPaginationData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${projectEndpoints.getProject}${projectId}`)
        .then((res) => setProjectOwnerEmail(res.data.projectOwnerEmail))
        .catch((err) => console.log(err));

      console.log("taskList w pierwszym: ", taskList);
      console.log("Dane o paginacji: ", paginationData);
    }
    // } else if (!isOpen) {
    //   setTaskList([]);
    // }
    // if (tasks !== undefined) {
    //   setTaskList(tasks);
    //   console.log("znowu tasklist:", taskList);
    // }
  }, [dispatch, isOpen, tasks, page]);

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      const taskDetails = {
        name: name,
        description: description,
        orderNumber: Number(orderNumber),
        projectIds: projectId,
        dateTimeAdded: new Date().toISOString(),
      };
      axios
        .post(taskEndpoints.addTask, taskDetails)
        .then(() => {
          axios
            .get(`${taskEndpoints.getTasksByProject}${projectId}`, {
              params: {
                page: page,
                size: 4,
                sort: "asc",
              },
            })
            .then((res) => {
              setTaskList(res.data.content);
              setPaginationData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));

      //setTaskList([...taskList, taskDetails]);
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(taskList.filter((t) => t.id != id));
  };

  // const taskCompleted = (e, id) => {
  //   e.preventDefault();
  //   //let's find index of element
  //   const element = taskList.findIndex((elem) => elem.id == id);

  //   //copy array into new variable
  //   const newTaskList = [...taskList];

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
        <ModalContent maxW="75%" maxH="95%">
          <ModalHeader>Lista zadań</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              {/* {user.role === "ADMIN" && ( */}
              {!email.localeCompare(projectOwnerEmail) ? (
                <form onSubmit={addTaskHandler}>
                  <Input
                    type="text"
                    defaultValue=""
                    onChange={(e) => setName(e.target.value)}
                    pattern="^[\s\S]{2,50}"
                    maxLength={50}
                    placeholder="Wprowadź nazwę zadania (2-50 znaków)"
                    title="Nazwa zadania może mieć od 2 do 50 znaków."
                    required
                  />
                  <Textarea
                    type="text"
                    defaultValue=""
                    onChange={(e) => setDescription(e.target.value)}
                    pattern="^[\s\S]{2,100}"
                    maxLength={100}
                    placeholder="Wprowadź opis zadania (2-100 znaków)"
                    title="Opis zadania może mieć od 2 do 100 znaków."
                    required
                  />
                  <Input
                    type="text"
                    defaultValue={0}
                    pattern="^[1-9][0-9]*"
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Wprowadź numer zadania"
                    title="Numer zadania powinien być liczbą naturalną."
                    required
                  />
                  <Button type="submit">Dodaj zadanie</Button>
                </form>
              ) : (
                <></>
              )}
              {/* )} */}
              <br />
              {taskList !== [] ? (
                <TableContainer mx="20px" mt="30px">
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>L.p.</Th>
                        <Th>ID</Th>
                        <Th>NAZWA</Th>
                        <Th>OPIS</Th>
                        <Th>UTWORZONE</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {taskList.map((t, id) => (
                        // <ListItem
                        //   className={t.isCompleted ? "crossText" : "listitem"}
                        // >
                        //   {t.value}
                        // </ListItem>

                        <TaskItem
                          orderNumber={t.orderNumber}
                          taskId={t.taskId}
                          name={t.name}
                          description={t.description}
                          dateTimeAdded={t.dateTimeAdded
                            .replace("T", " ")
                            .replace("Z", "")
                            .slice(0, -4)}
                          deletetask={deletetask}
                        />
                      ))}
                    </Tbody>
                  </Table>
                  <Flex justifyContent="center" alignItems="center">
                    Numer strony:
                    <NumberInput
                      ml={2}
                      mr={8}
                      w={28}
                      min={1}
                      max={paginationData.totalElements}
                      onChange={(value) => {
                        //const page = value ? value - 1 : 0;
                        setPage(value - 1);
                      }}
                      defaultValue={page + 1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
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
