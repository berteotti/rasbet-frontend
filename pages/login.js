import Head from "next/head";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Container,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getUser, login } from "../src/api/api";
import { useRouter } from "next/router";
import { setCookie } from "../src/cookie";
import { queryClient } from "../src/query";
import Header from "../src/components/header";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const useUpdateLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return {
    showPassword,
    username,
    password,
    handleShowClick,
    handleUsernameChange,
    handlePasswordChange,
  };
};

export default function Login() {
  const router = useRouter();

  const {
    showPassword,
    username,
    password,
    handleShowClick,
    handleUsernameChange,
    handlePasswordChange,
  } = useUpdateLogin();

  const { data, refetch: fetchUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
    enabled: false,
    onSuccess: (data) => {
      if (data && data.results) {
        queryClient.setQueryData(["user"], data.results[0]);
        router.push("/");
      }
    },
  });

  const { token, refetch } = useQuery({
    queryKey: ["token"],
    queryFn: () => login({ username, password }),
    enabled: false,
    onSuccess: (token) => {
      setCookie("token", token.access, 1);
      fetchUser();
    },
  });

  const submitLogin = (event) => {
    refetch();
    event.preventDefault();
  };

  return (
    <Container
      maxW="100%"
      paddingY="6"
      backgroundColor="gray.200"
      width="100wh"
      height="100vh"
    >
      <Head>
        <title>RASBet</title>
        <meta name="description" content="Best odds only with RASBet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <Flex
        flexDirection="column"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
        marginTop="50px"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="teal.400">Login</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={submitLogin}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="username"
                      placeholder="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>Forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New here?{" "}
          <Link color="teal.500" href="/register">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </Container>
  );
}
