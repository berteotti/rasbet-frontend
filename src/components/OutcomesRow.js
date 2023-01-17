import { HStack, Button, Flex, VStack, Text, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBookmakers, getOutcomes } from "../api/api";
import { queryClient } from "../query";
import Link from "next/link";

export default function GameRow({ outcome }) {
  const { home_team, away_team } = game;

  const { data: bookmaker } = useQuery({
    queryKey: ["bookmaker", game.id],
    queryFn: () => getBookmakers({ game: game.id, key: "betsson" }),
    onSuccess: (data) =>
      queryClient.setQueryData(["bookmaker", game.id], data.results[0]),
    onError: console.log,
  });

  const { data: outcomes } = useQuery({
    queryKey: ["outcomes", bookmaker?.id],
    queryFn: () => getOutcomes({ bookmaker: bookmaker.id }),
    enabled: Boolean(bookmaker?.id),
    onSuccess: (data) =>
      queryClient.setQueryData(["outcomes", bookmaker.id], data.results),
    onError: console.log,
  });

  return (
    <VStack padding="4" backgroundColor="white" rounded="lg">
      <Flex justify={"space-between"} w="full" alignItems={"center"}>
        <Text as="b">
          {home_team} - {away_team}
        </Text>
        <Button
          as={Link}
          href={`/game/${game.id}`}
          colorScheme="teal">
          Ver jogo
        </Button>
      </Flex>
      {outcomes && outcomes.length && (
        <Flex w="full">
          {outcomes.map(({ id, multiplier, result }) => (
            <Flex justifyContent={"center"} key={id} flex="1">
              <Button
                disabled={bets.find(({ game: { id } }) => id === game.id)}
                colorScheme="teal"
                onClick={() =>
                  setBets((oldBets) => [
                    ...oldBets,
                    { id, result: result, multiplier, game: game },
                  ])
                }
              >
                <HStack spacing={5}>
                  <div>{result}</div>
                  <div>{multiplier}</div>
                </HStack>
              </Button>
            </Flex>
          ))}
        </Flex>
      )}
    </VStack>
  );
}
