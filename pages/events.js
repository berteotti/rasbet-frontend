import Head from "next/head";
import { queryClient } from "../src/query";
import Header from "../src/components/header";
import {
  Container,
  Flex,
  Heading,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useGetEvents } from "../src/logic/eventsHandler";
import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

export default function Events() {
  const { user } = useContext(AuthContext);
  const events = useGetEvents();

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
              Eventos
            </Heading>
            <VStack spacing={4}>
              {events?.results.length > 0 ? (
                events.results?.map((event) => (
                  <Box w="full" key={event.id}>
                    {event.description}
                  </Box>
                ))
              ) : (
                <p>Sem eventos</p>
              )}
            </VStack>
          </Flex>
        </HStack>
      </main>

      <footer></footer>
    </Container>
  );
}
