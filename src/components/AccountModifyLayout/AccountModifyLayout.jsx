import React from "react";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const AccountModifyLayout = (props) => {
  const {
    title,
    description,
    success,
    errMsg,
    successText,
    sendToken,
    navigate,
    token,
    setToken,
    password,
    setPassword,
    handleSubmit,
    submitButtonText,
    confirmPassword,
    setConfirmPassword,
  } = props;

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
            <Heading textAlign="center">{title}</Heading>
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
            <Text fontSize="3xl">{description}</Text>
            <Button
              borderRadius={0}
              onClick={sendToken}
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
                <Text fontSize="xl">Otrzymany token:</Text>
                <Input
                  onChange={(e) => setToken(e.target.value)}
                  value={token}
                  readOnly
                />
                <Input
                  placeholder="Wprowadź hasło"
                  style={{
                    padding: "16px",
                    width: "100%",
                    height: "32px",
                    borderRadius: "6px",
                  }}
                  background="white"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Input
                  placeholder="Powtórz hasło"
                  style={{
                    padding: "16px",
                    width: "100%",
                    height: "32px",
                    borderRadius: "6px",
                  }}
                  background="white"
                  type="password"
                  id="changePassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <Button
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleSubmit}
                >
                  {submitButtonText}
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

export default AccountModifyLayout;
