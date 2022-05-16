import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import ModalLayout from "../ModalLayout";

export const TopBar = () => {
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
      <SearchBar />
      <IconButton
        colorScheme="blue"
        aria-label="Wyloguj"
        icon={<CloseIcon />}
      />
    </Flex>
  );
};
