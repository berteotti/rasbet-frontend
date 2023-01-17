import Head from "next/head";
import { queryClient } from "../src/query";
import Header from "../src/components/Header";
import {
    Button,
    Container,
    Flex,
    Heading,
    VStack,
    Box,
    HStack,
    IconButton,
    Input,
    Stack,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../src/api/api";
import GameRow from "../src/components/GameRow";
import { getgame } from "../../src/api/api";

export default function Games() {
    const user = queryClient.getQueryData(["user"]);

    // Add a variable for the game ID
    const router = useRouter()
    const { id } = router.query



    const { data: game } = useQuery({
        queryKey: ["game", id],
        queryFn: () => getGame({ id }),
    });

    return (
        <Container
            maxW="100%"
            paddingY="6"
            backgroundColor="gray.200"
            width="100wh"
            height="100vh"
            overflow="auto"
        >
            <Head>
                <title>RASBet</title>
                <meta name="description" content="Best odds only with RASBet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Header user={user} />
            </header>
            <main>
                <HStack spacing={6} align="flex-start">
                    <Flex direction="column" flex="1" padding="4" rounded="lg">
                        <Heading as="h3" size="lg" marginBottom="4">
                            Games
                        </Heading>
                        <VStack spacing={4}>
                            {game.name}
                        </VStack>
                    </Flex>
                </HStack>
            </main>

            <footer></footer>
        </Container>
    );
}
