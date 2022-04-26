import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { FormLabel, Heading, InputGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FormControl, Box, Flex, Stack } from "@chakra-ui/react";
import { authEndpoints } from "../shared/config/endpoints";
import { Text } from "@chakra-ui/react";

const RegisterPage = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setSuccess(true);
    }
    setErrMsg("");
  }, []);

  useEffect(() => {}, [success, errMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Hasła się nie zgadzają.");
    } else {
      axios
        .post(authEndpoints.register, {
          email,
          password,
        })
        .then((res) => {
          axios
            .post(authEndpoints.login, { email, password })
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => {
              setErrMsg(err);
            });
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setErrMsg("");
          setSuccess(true);
        })
        .catch((err) => {
          setErrMsg("Takie konto już istnieje.");
          setSuccess(false);
        });
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setSuccess(false);
  };

  return (
    <>
      {success ? (
        <section>
          <Heading>Pomyślnie zalogowano</Heading>
          <br />
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={handleLogout}
          >
            Wyloguj się
          </Button>
        </section>
      ) : (
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
                <Heading textAlign="center">Rejestracja</Heading>
                <span className="line">
                  <Text color="red.500" textAlign="center">
                    {errMsg}
                  </Text>
                </span>
                <FormControl>
                  <FormLabel htmlFor="emailname">Adres e-mail:</FormLabel>
                  <InputGroup>
                    <input
                      placeholder="Wprowadź adres e-mail"
                      style={{
                        padding: "16px",
                        width: "100%",
                        height: "32px",
                        borderRadius: "6px",
                      }}
                      type="email"
                      id="emailname"
                      ref={emailRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </InputGroup>
                </FormControl>
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
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
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
                      id="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
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
                  Zarejestruj się
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default RegisterPage;
