import Head from "next/head";
import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    Card,
    CloseButton,
    InputGroup,
    Container,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Center,
    Square,
    HStack,
    FormLabel,
    Icon,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    GridItem,
    Grid,
    SimpleGrid,
    CardHeader,
    CardFooter,
    Text,
    CardBody,
} from "@chakra-ui/react";
import {FaUserAlt, FaLock, FaArrowCircleRight, FaAt, FaRegUser} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {getUser, login} from "../src/api/api";
import { useRouter } from "next/router";


const IconUser = chakra(FaUserAlt);
const IconPass = chakra(FaLock);
const IconMail = chakra(FaAt);
const IconName = chakra(FaRegUser);

export default function Profile() {

    const { data, refetch: fetchUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
        enabled: false,
        select: (data) => data.results[0],
        onSuccess: () => router.push("/"),
    });


    const router = useRouter();
    const Username = "username"
    const Fname = "fname"
    const Lname = "lname"
    const Password = "pass"
    const Email = "mail"
    const Saldo = "50"


    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(Username);
    const [password, setPassword] = useState(Password);
    const [firstName, setFirstName] = useState(Fname);
    const [lastName, setLastnName] = useState(Lname);
    const [email, setEmail] = useState(Email);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlefnameChange = (event) => setFirstName(event.target.value);
    const handlelnameChange = (event) => setLastnName(event.target.value);
    const handleemailChange = (event) => setEmail(event.target.value);

    const handleClick = () => setShowPassword(!showPassword);

    return (
        <>

            <Head>
                <title>Perfil</title>
                <meta name="description" content="Best odds only with RASBet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
            <Box bg="teal.500"  w="100%" p={10} >
                <Center as = "b" color="dark">
                    Bem vindo, {Username}
                </Center>
            </Box>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.200"
                justifyContent="center"
                alignItems="center">
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >


                    <Box borderRadius =  "xl" bg='White' minW={{ base: "90%", md: "600px" }}>
                           <Center>
                               <Heading color="teal.500">{ Fname} </Heading>
                           </Center>
                        <Center color = "teal"> Saldo: {Saldo}$   </Center>
                        <Center>
                        <HStack>
                            <h1 style={{ color: 'teal' }}>Consultar histórico  de apostas</h1>
                            <Link href="/histbets">
                                <FaArrowCircleRight />
                            </Link>

                        </HStack>
                        </Center>
                        <hr/>
                        <br/>
                        <SimpleGrid columns={2} spacing={10}>
                            <Card size="sm" maxW="sm" align ="center" variant = "filled" justify="revert">
                                <CardHeader>
                                    <Heading color ="teal" size='s'> Depositar dinheiro:</Heading>
                                </CardHeader>
                                <CardFooter>
                                    <Button size = "sm" colorScheme='teal' variant='outline' >Depositar</Button>
                                </CardFooter>
                            </Card>
                            <Card size="sm" align ="center">
                                <CardHeader>
                                    <Heading color ="teal" size='s'> Levantar dinheiro:</Heading>
                                </CardHeader>
                                <CardFooter>
                                    <Button align = "center" size = "sm" colorScheme='teal' variant='outline' >Levantar</Button>
                                </CardFooter>
                            </Card>
                        </SimpleGrid>
                        <br/>
                        <hr/>
                            <form >
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <FormLabel as = "b"  color = "teal">Nome de Utilizador:</FormLabel>
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
                                    <FormLabel as = "b"  color = "teal">Password:</FormLabel>
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
                                    <FormLabel as = "b"  color = "teal">Primeiro Nome:</FormLabel>
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
                                    <FormLabel as = "b"  color = "teal">Último Nome:</FormLabel>
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
                                    <FormLabel as = "b"  color = "teal">Endereço E-mail:</FormLabel>
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
                            </Stack>
                        </form>
                    </Box>

                </Stack>

            </Flex>

            </main>
       </>


    )


}


