import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import ModalLayout from "../ModalLayout";
import { connect, useDispatch} from "react-redux";
import * as actions from "../../store/actions/index";


const TopBar = () => {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(actions.logout());
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      width="100%"
      bgColor="#F9F9F9"
      padding="20px"
    >
      <ModalLayout
        title="Dodawanie projektu"
        activity="test"
        isAddingModal={true}
      />
      <IconButton
        colorScheme="blue"
        aria-label="Wyloguj"
        onClick={handleLogout}
        icon={<CloseIcon />}
      />
    </Flex>
  );
};
export default connect(null, null)(TopBar);
