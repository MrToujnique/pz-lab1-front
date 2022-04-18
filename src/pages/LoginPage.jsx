import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, FormControl, Text } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { authEndpoints } from "../shared/config/endpoints";
import { Heading, Box, Stack, InputGroup, Flex } from "@chakra-ui/react";
import CustomLink from "../components/CustomLink/CustomLink";

const LoginPage = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setSuccess(true);
    }
  }, []);

  useEffect(() => {}, [success, errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(authEndpoints.login, { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setEmail("");
        setPassword("");
        setErrMsg("");
        setSuccess(true);
      })
      .catch((err) => {
        setErrMsg("Nieprawidłowe dane logowania.");
        setSuccess(false);
      });
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
                <Heading textAlign="center">Logowanie</Heading>
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
                  Zaloguj się
                </Button>
                <Flex flexDirection="column" alignItems="flex-end">
                  <CustomLink to="/przypomnienie-hasla" textAlign="right">
                    Nie pamiętasz hasła?
                  </CustomLink>
                </Flex>
              </Stack>
            </form>
          </Box>
          <br />
          <Text>
            Nie posiadasz konta?
            <br />
            <span className="line">
              <CustomLink to="/rejestracja">Zarejestruj się</CustomLink>
            </span>
          </Text>
        </Flex>
      )}
    </>
  );
};

export default LoginPage;
