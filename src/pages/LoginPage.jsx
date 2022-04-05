import { useRef, useState, useEffect, useContext } from "react";

import axios from "axios";
import { Button, FormControl, Text } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { LOGIN_URL } from "./../constants/constants";
import { Heading, Box, Stack, InputGroup, Flex } from "@chakra-ui/react";
import { useResolvedPath, useMatch, Link } from "react-router-dom";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && " (active)"}
    </div>
  );
}

const LoginPage = () => {
  const emailRef = useRef();
  const errRef = useRef();

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
      .post(LOGIN_URL, { email, password })
      .then((res) => {
        if (res.data.email !== null) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setEmail("");
          setPassword("");
          setErrMsg("");
          setSuccess(true);
        } else {
          setSuccess(false);
          setErrMsg("Nieprawidłowe dane logowania!");
        }
      })
      .catch((err) => {
        setErrMsg(err);
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
                      type="text"
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
              </Stack>
            </form>
          </Box>
          <p>
            Nie posiadasz konta?
            <br />
            <span className="line">
              <CustomLink to="/rejestracja">Zarejestruj się</CustomLink>
            </span>
          </p>
        </Flex>
      )}
    </>
  );
};

export default LoginPage;
