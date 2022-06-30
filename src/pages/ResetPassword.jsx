import React from "react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { authEndpoints } from "./../shared/config/endpoints";

const ResetPassword = () => {
  const { token } = useParams();
  let navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
    responseType: "text",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.normalize() !== confirmNewPassword.normalize()) {
      setErrMsg("Hasła się różnią.");
    } else {
      axios
        .put(`${authEndpoints.updatePassword}${token}`, newPassword, config)
        .then((res) => {
          setErrMsg("Pomyślnie zmieniono hasło.");
          localStorage.removeItem("user");
          setTimeout(() => {
            navigate("/");
          }, 500);
        })
        .catch((err) =>
          setErrMsg(`Niepoprawny token, kod błędu: ${err.response.status}`)
        );
    }
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="white"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.100"
              boxShadow="md"
            >
              <Heading textAlign="center">Resetowanie hasła</Heading>
              <span className="line">
                <Text color="red.500" textAlign="center">
                  {errMsg}
                </Text>
              </span>
              <FormControl>
                <FormLabel htmlFor="password">Hasło</FormLabel>
                <InputGroup>
                  <input
                    placeholder="Wprowadź hasło"
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "32px",
                      borderRadius: "6px",
                    }}
                    type="password"
                    id="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    title="Hasło musi zawierać minimum 8 znaków."
                    pattern="^.{8,}"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmPassword">Powtórz hasło</FormLabel>
                <InputGroup>
                  <input
                    placeholder="Powtórz hasło"
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "32px",
                      borderRadius: "6px",
                    }}
                    type="password"
                    id="changePassword"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                    required
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Zmień hasło
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default ResetPassword;
