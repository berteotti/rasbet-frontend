import Head from "next/head";
import { queryClient } from "../src/query";
import Header from "../src/components/header";
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
import { getBets } from "../src/api/api";
import BetRow from "../src/components/BetRow";
import {useGetBets} from "../src/logic/betsHandler";

export default function Bets() {
  const user = queryClient.getQueryData(["user"]);
  const bets = useGetBets();

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
                Apostas
              </Heading>
              <VStack spacing={4}>
                {bets?.results.length > 0 ? (
                    bets.results?.map((bet) => (
                        <Box w="full" key={bet.id}>
                          <BetRow bet={bet} />
                        </Box>
                    ))
                ) : (
                    <p>Sem apostas</p>
                )}
              </VStack>
            </Flex>
          </HStack>
        </main>

        <footer></footer>
      </Container>
  );
}