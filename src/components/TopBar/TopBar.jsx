import { ChatIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { useNavigate } from "react-router-dom";
import axios from "./../../axios";
import { studentEndpoints } from "./../../shared/config/endpoints";
import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import AddProjectModal from "../AddProjectModal/AddProjectModal";

const TopBar = () => {
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();
  const chatUrl = "https://tomatochat.fly.dev/";

  useEffect(() => {
    axios
      .get(`${studentEndpoints.getStudentByEmail}`)
      .then((res) => {
        if (res.status === 500) {
          setIsStudent(false);
        } else if (res.status === 200) {
          setIsStudent(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(actions.logout());
    window.location.reload(false);
    //navigate("/logowanie");
  };

  return (
    <Flex
      direction="row"
      justify="space-around"
      width="100%"
      bgColor="#F9F9F9"
      padding="20px"
    >
      <Button background="yellow.400" onClick={() => navigate("/")}>
        Twoje projekty
      </Button>
      <Button
        background="yellow.400"
        onClick={() => navigate("/wolne-projekty")}
      >
        Wolne projekty
      </Button>
      {isStudent ? <></> : <AddProjectModal />}
      <IconButton
        colorScheme="green"
        aria-label="Chat"
        onClick={() => window.open(chatUrl)}
        icon={<ChatIcon />}
      />
      <IconButton
        colorScheme="blue"
        aria-label="Wyloguj"
        onClick={handleLogout}
        icon={<CloseIcon />}
      ></IconButton>
    </Flex>
  );
};
export default TopBar;
