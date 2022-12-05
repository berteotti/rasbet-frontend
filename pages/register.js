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
import { FaUserAlt, FaLock, FaAt, FaRegUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { register } from "../src/api/api";
import { useRouter } from "next/router";
import Header from "../src/components/Header";

const IconUser = chakra(FaUserAlt);
const IconPass = chakra(FaLock);
const IconMail = chakra(FaAt);
const IconName = chakra(FaRegUser);

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastnName] = useState("");
  const [email, setEmail] = useState("");

  const { refetch } = useQuery({
    queryKey: [],
    queryFn: () =>
      register({
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    enabled: false,
    onSuccess: () => router.push("/"),
  });

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlefnameChange = (event) => setFirstName(event.target.value);
  const handlelnameChange = (event) => setLastnName(event.target.value);
  const handleemailChange = (event) => setEmail(event.target.value);

  const handleClick = () => setShowPassword(!showPassword);

  const submitRegister = (event) => {
    refetch();
    event.preventDefault();
  };

  return (
    <Container
      maxW="100%"
      paddingY="6px"
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
      <main>
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
            <Heading color="teal.400">Registo</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={submitRegister}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconUser color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="username"
                        placeholder="Nome de utilizador"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconPass color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconName color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Primeiro Nome"
                        value={firstName}
                        onChange={handlefnameChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconName color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Último Nome"
                        value={lastName}
                        onChange={handlelnameChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconMail color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="Endereço E-mail"
                        value={email}
                        onChange={handleemailChange}
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
                    Registar
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box>
              Já possui conta?{" "}
              <Link color="teal.500" href="/login">
                Login
              </Link>
            </Box>
          </Stack>
        </Flex>
      </main>

      <footer></footer>
    </Container>
  );
}
