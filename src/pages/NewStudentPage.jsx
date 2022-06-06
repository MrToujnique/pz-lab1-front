import React from "react";
import { FormControl } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import axios from "./../axios";
import { studentEndpoints } from "../shared/config/endpoints";
import { Select } from "@chakra-ui/react";
import { studyTypes } from "../shared/config/studyTypes";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NewStudentPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [studyType, setStudyType] = useState("Stacjonarne");
  const successfulSubmitText =
    "Pomyślnie utworzono studenta, zostaniesz przekierowany za 5 sekund...";

  const getEmail = localStorage.getItem("email");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      email: getEmail,
      name: name,
      surname: surname,
      index_number: indexNumber,
      projectsIds: [],
      personEmail: getEmail,
      studyType: !studyType.localeCompare("Stacjonarne")
        ? "STATIONARY"
        : "EXTRAMURAL",
    };
    axios
      .post(studentEndpoints.addStudent, studentData)
      .then((res) => {
        console.log("Po dodaniu studenta");
        setErrMsg("");
        setName("");
        setSurname("");
        setIndexNumber("");
        setStudyType("Stacjonarne");
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        console.log("Błąd w dodawaniu studenta, błąd: ", err);
        setErrMsg(err);
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
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.100"
              boxShadow="md"
            >
              <Heading textAlign="center">Dane studenta</Heading>
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
                <FormLabel htmlFor="name">Imię:</FormLabel>
                <InputGroup>
                  <input
                    placeholder="Wprowadź imię"
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "32px",
                      borderRadius: "6px",
                    }}
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="emailname">Nazwisko:</FormLabel>
                <InputGroup>
                  <input
                    placeholder="Wprowadź nazwisko"
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "32px",
                      borderRadius: "6px",
                    }}
                    type="text"
                    id="surname"
                    autoComplete="off"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="indexnumber">Numer indeksu:</FormLabel>
                <InputGroup>
                  <input
                    placeholder="Wprowadź numer indeksu"
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "32px",
                      borderRadius: "6px",
                    }}
                    type="text"
                    id="indexnumber"
                    autoComplete="off"
                    onChange={(e) => setIndexNumber(e.target.value)}
                    value={indexNumber}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                Tryb studiów:
                <Select
                  value={studyType}
                  onChange={(e) => setStudyType(e.target.value)}
                >
                  {Object.values(studyTypes).map((item) => (
                    <option>{item}</option>
                  ))}
                </Select>
                <Box marginTop="16px">
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    marginTop="32px"
                  >
                    Potwierdź
                  </Button>
                </Box>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default NewStudentPage;
