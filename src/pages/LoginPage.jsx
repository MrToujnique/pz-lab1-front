import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, FormControl, Text } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { authEndpoints } from "../shared/config/endpoints";
import { Heading, Box, Stack, InputGroup, Flex } from "@chakra-ui/react";
import CustomLink from "../components/CustomLink";
import { useNavigate } from "react-router-dom";
import { personEndpoints } from "./../shared/config/endpoints";

const LoginPage = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const [successfulSubmitText, setSuccessfulSubmitText] = useState(
    "Pomyślnie zalogowano, zostaniesz przekierowany..."
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("email") !== null &&
      localStorage.getItem("token") !== null
    ) {
      setSuccess(true);
    }
  }, []);

  useEffect(() => {}, [success, errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(authEndpoints.login, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.jwToken);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        if (!localStorage.getItem("role").localeCompare("ADMIN")) {
          axios
            .post(personEndpoints.getAdminToken, { email, password })
            .then((res) => {
              localStorage.setItem("adminToken", res.data);
            })
            .catch((err) => console.log(err));
        }
        setEmail("");
        setPassword("");
        setErrMsg("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSuccessfulSubmitText("");
          // navigate("/");
          window.location.reload(false);
        }, 500);
      })
      .catch((err) => {
        setErrMsg("Nieprawidłowe dane logowania.");
        setSuccess(false);
      });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setSuccess(false);
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
              <Heading textAlign="center">Logowanie</Heading>
              <span className="line">
                {!success ? (
                  <Text color="red.500" textAlign="center">
                    {errMsg}
                  </Text>
                ) : (
                  <Text color="green.400" textAlign="center">
                    {successfulSubmitText}
                  </Text>
                )}
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
    </>
  );
};

export default LoginPage;
