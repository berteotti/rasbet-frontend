import Head from "next/head";
import Link from "next/link";
import { queryClient } from "../src/query";
import styles from "../styles/Home.module.css";
import Header from "../src/components/header";
import {
  createBet,
  getGames,
  getGameSubscriber,
  getUser,
} from "../src/api/api";
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
import { getCookie, setCookie } from "../src/cookie";
import GameRow from "../src/components/GameRow";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Home() {
  const user = queryClient.getQueryData(["user"]);
  const token = process.browser ? getCookie("token") : null;

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
  const { data: gameSubscribers } = useQuery({
    queryKey: ["game_subscriber"],
    queryFn: () => getGameSubscriber(),
  });
  const initialBetState = {
    loading: false,
    error: false,
    success: false,
  };
  const [bets, setBets] = useState([]);
  const [stake, setStake] = useState();
  const [betState, setBetState] = useState(initialBetState);
  const odd = bets.reduce((acc, cur) => acc * cur.multiplier, 1).toFixed(2);

  const submitBet = () => {
    if (!stake) return;
    setBetState({ ...initialBetState, loading: true });
    createBet({
      stake: stake,
      multiplier: odd,
      prize: 0,
      user: user.id,
      outcomes: bets.map(({ id }) => id),
    })
        .then(() => {
          setBetState({ ...initialBetState, success: true });
          setBets([]);
        })
        .catch(() => {
          setBetState({ ...initialBetState, error: true });
        });
  };

  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

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
                Jogos
              </Heading>
              <VStack spacing={4}>
                {games && games.results ? (
                    games.results?.map((game) => (
                        <Box w="full" key={game.id}>
                          <GameRow
                              game={game}
                              setBets={setBets}
                              bets={bets}
                              subscription={gameSubscribers?.results.find(
                                  (gameSubscriber) => gameSubscriber.game === game.id
                              )}
                          />
                        </Box>
                    ))
                ) : (
                    <p>Sem jogos</p>
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
                Apostas
              </Heading>
              {bets?.length > 0 ? (
                  <Stack>
                    {bets.map(({ id, result, multiplier, game }) => (
                        <div key={id}>
                          <HStack justify="space-between">
                            <div>
                              <div>
                                {game.home_team} - {game.away_team}
                              </div>
                              <div>
                                {result} - {multiplier}
                              </div>
                            </div>
                            <IconButton
                                icon={<FaTrash />}
                                onClick={() =>
                                    setBets((oldBets) =>
                                        oldBets.filter(({ id: betId }) => id !== betId)
                                    )
                                }
                            />
                          </HStack>
                        </div>
                    ))}
                    Odd: {odd}
                    <Input
                        value={stake}
                        onChange={(event) => setStake(event.target.value)}
                    />
                    {user ? (
                        <Button loading={betState.loading} onClick={submitBet}>
                          Submeter aposta
                        </Button>
                    ) : (
                        <Button as={Link} href="/login">
                          Entrar para submeter aposta
                        </Button>
                    )}
                    {betState.error && <p>Algo correu mal</p>}
                  </Stack>
              ) : (
                  <>
                    <p>Sem apostas!</p>
                    {betState.success && isVisible && (
                        <Alert status="success">
                          <AlertIcon />
                          <AlertTitle>Aposta submetida com sucesso!</AlertTitle>
                          <CloseButton
                              alignSelf="flex-start"
                              position="relative"
                              right={-1}
                              top={-1}
                              onClick={onClose}
                          />
                        </Alert>
                    )}
                  </>
              )}
            </Flex>
          </HStack>
        </main>

        <footer></footer>
      </Container>
  );
}