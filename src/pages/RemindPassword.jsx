import {
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

//TODO, ponieważ ten serwis nie działa jeszcze na backendzie
const RemindPassword = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // axios
    //   .post(MAILER_URL, {
    //     email,
    //     MAILER_SUBJECT,
    //     MAILER_TEXT,
    //     isHtmlContent: true,
    //     updatePassword: MAILER_ROLES.updatePassword,
    //   })
    //   .then((res) => {
    //     console.log("sukces");
    //   })
    //   .catch((err) => setErrMsg(err));
  };

  return (
    <>
      <Box>
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
                <Heading alignSelf="center">Przypomnienie hasła</Heading>
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
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                  Wyślij
                </Button>
                <span className="line">
                  <Text color="red.500" textAlign="center">
                    {errMsg}
                  </Text>
                </span>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RemindPassword;
