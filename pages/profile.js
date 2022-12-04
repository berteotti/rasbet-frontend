import Head from "next/head";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  Card,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Center,
  HStack,
  FormLabel,
  Link,
  FormControl,
  SimpleGrid,
  CardHeader,
  CardFooter,
  Container,
} from "@chakra-ui/react";
import {
  FaUserAlt,
  FaLock,
  FaArrowCircleRight,
  FaAt,
  FaRegUser,
} from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../src/api/api";
import { useRouter } from "next/router";
import { queryClient } from "../src/query";
import Header from "../src/components/Header";

const IconUser = chakra(FaUserAlt);
const IconPass = chakra(FaLock);
const IconMail = chakra(FaAt);
const IconName = chakra(FaRegUser);

export default function Profile() {
  const router = useRouter();
  const user = queryClient.getQueryData(["user"]);

  if (process.browser && !Boolean(user)) {
    router.push("/");
  }

  const mutation = useMutation(
    () =>
      updateUser({
        id: user.id,
        email,
        username,
        first_name: firstName,
        last_name: lastName,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data);
      },
    }
  );

  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastnName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastnName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  return (
    <Container
      maxW="100%"
      paddingY="6px"
      backgroundColor="gray.200"
      width="100wh"
      height="100vh"
    >
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Best odds only with RASBet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header user={user} />
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
            <Box
              borderRadius="xl"
              bg="White"
              minW={{ base: "90%", md: "600px" }}
            >
              <Center>
                <Heading color="teal.500">{firstName} </Heading>
              </Center>
              <Center color="teal"> Saldo: Saldo$ </Center>
              <Center>
                <HStack>
                  <h1 style={{ color: "teal" }}>
                    Consultar histórico de apostas
                  </h1>
                  <Link href="/histbets">
                    <FaArrowCircleRight />
                  </Link>
                </HStack>
              </Center>
              <hr />
              <br />
              <SimpleGrid columns={2} spacing={10}>
                <Card
                  size="sm"
                  maxW="sm"
                  align="center"
                  variant="filled"
                  justify="revert"
                >
                  <CardHeader>
                    <Heading color="teal" size="s">
                      {" "}
                      Depositar dinheiro:
                    </Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" colorScheme="teal" variant="outline">
                      Depositar
                    </Button>
                  </CardFooter>
                </Card>
                <Card size="sm" align="center">
                  <CardHeader>
                    <Heading color="teal" size="s">
                      {" "}
                      Levantar dinheiro:
                    </Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      align="center"
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                    >
                      Levantar
                    </Button>
                  </CardFooter>
                </Card>
              </SimpleGrid>
              <br />
              <hr />
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  mutation.mutate();
                }}
              >
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <FormLabel as="b" color="teal">
                      Nome de Utilizador:
                    </FormLabel>
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
                    <FormLabel as="b" color="teal">
                      Primeiro Nome:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconName color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Primeiro Nome"
                        value={firstName}
                        onChange={handleFirstNameChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel as="b" color="teal">
                      Último Nome:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconName color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Último Nome"
                        value={lastName}
                        onChange={handleLastNameChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel as="b" color="teal">
                      Endereço E-mail:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconMail color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="Endereço E-mail"
                        value={email}
                        onChange={handleEmailChange}
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
                    Save
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </main>
    </Container>
  );
}
