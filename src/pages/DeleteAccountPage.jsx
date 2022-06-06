import React from "react";
import { Flex, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "./../axios";
import { personEndpoints } from "./../shared/config/endpoints";
import { useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState(
    "Wysłano link z procedurą usunięcia konta na Twój adres e-mail."
  );
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("email");

  const sendMail = (e) => {
    e.preventDefault();
    axios
      .post(personEndpoints.emailRequestDelete)
      .then((res) => {
        console.log(res);
        setErrMsg("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setErrMsg("Wysyłanie linku nie powiodło się.");
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(personEndpoints.deletePerson, {
        token: token,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setErrMsg("");
        setSuccess(true);
        setSuccessText("Pomyślnie usunięto konto.");
        localStorage.clear();
        setTimeout(() => {
          navigate("/logowanie");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setErrMsg("Usuwanie nie powiodło się, sprawdź poprawność danych.");
        setTimeout(() => {
          setErrMsg("");
        }, 6000);
      });
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
          <Stack spacing={4} p="1rem" backgroundColor="gray.100" boxShadow="md">
            <Heading textAlign="center">Usuwanie konta</Heading>
            <span className="line">
              {!success ? (
                <Text color="red.500" textAlign="center">
                  {errMsg}
                </Text>
              ) : (
                <Text color="green.400" textAlign="center">
                  {successText}
                </Text>
              )}
            </span>
            <Text fontSize="3xl">
              Czy chcesz rozpocząć procedurę usuwania konta?
            </Text>
            <Button
              borderRadius={0}
              onClick={sendMail}
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Tak
            </Button>
            <Button
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={() => navigate("/")}
            >
              Nie (Powrót do strony głównej)
            </Button>
            {success ? (
              <>
                {" "}
                <Text fontSize="xl">
                  Wprowadź token, który otrzymałeś/aś w wiadomości e-mail:
                </Text>
                <Input
                  background="white"
                  onChange={(e) => setToken(e.target.value)}
                  value={token}
                />
                <Input
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
                />
                <Button
                  variant="solid"
                  color="red.500"
                  width="full"
                  onClick={handleDelete}
                >
                  Usuń konto
                </Button>
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default DeleteAccountPage;
