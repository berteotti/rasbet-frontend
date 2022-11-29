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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock,FaAt ,FaRegUser} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { register} from "../src/api/api";

const IconUser = chakra(FaUserAlt);
const IconPass = chakra(FaLock);
const IconMail = chakra(FaAt);
const IconName = chakra(FaRegUser);




export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email,setEmail] = useState("");

    const { refetch } = useQuery({
        queryKey: ["token"],
        queryFn: () => register({ username,fname,lname,email,password}),
        enabled: false,
    });



    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlefnameChange = (event) => setFname(event.target.value);
    const handlelnameChange = (event) => setLname(event.target.value);
    const handleemailChange = (event) => setEmail(event.target.value);

    const handleClick = () => setShowPassword(!showPassword)

    const submitRegister= (event) => {
        refetch().then(() => event.preventDefault());
    };

    return (
        <div>
            <Head>
                <title>RASBet</title>
                <meta name="description" content="Best odds only with RASBet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Flex
                    flexDirection="column"
                    width="100wh"
                    height="100vh"
                    backgroundColor="gray.200"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack
                        flexDir="column"
                        mb="2"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar bg='red.500'/>
                        <Heading color="red.400">Registo</Heading>
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
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
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
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
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
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
                                                <IconName color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                type="text"
                                                placeholder="Primeiro Nome"
                                                value={fname}
                                                onChange={handlefnameChange}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
                                                <IconName color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                type="text"
                                                placeholder="Último Nome"
                                                value={lname}
                                                onChange={handlelnameChange}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
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
        </div>
    );
}
