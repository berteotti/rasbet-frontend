import Head from "next/head";
import Link from "next/link";
import { queryClient } from "../src/query";
import styles from "../styles/Home.module.css";
import Header from "../src/components/Header";
import { getGames, getUser } from "../src/api/api";
import {
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCookie, setCookie } from "../src/cookie";
import GameRow from "../src/components/GameRow";

export default function Home() {
  const user = queryClient.getQueryData(["user"]);
  const token = process.browser ? getCookie("token") : null;
  console.log(user);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
    enabled: Boolean(token) && !Boolean(user),
    onSuccess: (data) => {
      if (data && data.results) {
        queryClient.setQueryData(["user"], data.results[0]);
      }
    },
    onError: () => {
      if (token) {
        setCookie("token", "", 0);
      }
    },
  });

  const { data: games } = useQuery({
    queryKey: ["games"],
    queryFn: () => getGames(),
  });
  const outcomes = null;

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
              {games && games.results ? (
                games.results?.map((game) => (
                  <Box w="full" key={game.id}>
                    <GameRow game={game} />
                  </Box>
                ))
              ) : (
                <p>No games</p>
              )}
            </VStack>
          </Flex>
          <Flex
            direction="column"
            minW="200px"
            padding="4"
            background="white"
            rounded="lg"
          >
            <Heading as="h3" size="lg" marginBottom="4">
              Bets
            </Heading>
            {outcomes ? (
              outcomes.map(({ id, name, multiplier }) => (
                <div key={id}>
                  {name} vs {multiplier}
                </div>
              ))
            ) : (
              <p>No bet</p>
            )}
            {outcomes && <Button>Submit bet</Button>}
          </Flex>
        </HStack>
      </main>

      <footer></footer>
    </Container>
  );
}
