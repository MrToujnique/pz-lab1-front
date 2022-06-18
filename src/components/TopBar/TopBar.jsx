import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import ModalLayout from "../ModalLayout";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "./../../axios";
import {
  personEndpoints,
  studentEndpoints,
} from "./../../shared/config/endpoints";
import { useState, useEffect } from "react";

const TopBar = () => {
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();

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
      {isStudent ? (
        <></>
      ) : (
        <ModalLayout
          title="Dodawanie projektu"
          activity="test"
          isAddingModal={true}
        />
      )}
      <IconButton
        colorScheme="blue"
        aria-label="Wyloguj"
        onClick={handleLogout}
        icon={<CloseIcon />}
      >
        <Navigate to="/logowanie" />
      </IconButton>
    </Flex>
  );
};
export default connect(null, null)(TopBar);
