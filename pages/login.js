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
import Header from "../src/components/Header";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

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
                      placeholder="password"
                      value={password}
                      onChange={handlePasswordChange}
                      pr="4.5rem"
                      mb="4"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link fontWeight="medium" color="teal.500" href="#">
                      Forgot password?
                    </Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  variantColor="teal"
                  type="submit"
                  isLoading={token.isLoading}
                >
                  Login
                </Button>
                <Flex justifyContent="center" my="2">
                  <Avatar name="John Doe" src="https://bit.ly/sage-adebayo" />
                </Flex>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Login;

// Notes Refactoring:
// This refactors the code by moving the handleShowClick, handleUsernameChange, handlePasswordChange, and submitLogin functions into separate, named functions. This makes the code more readable and makes it easier to test the different parts of the code. It also moves the component to be a functional component instead of a class component
// It also makes sure that the component is wrapped in a container with a max width of 100% and a height of 100vh so that it doesn't overflow.
// It also makes sure that the form helper text is aligned to the right, and it also makes sure that the avatar is centred.