import {
  HStack,
  Button,
  Flex,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userAgent } from "next/server";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import {
  createGameSubscriber,
  deleteGameSubscriber,
  getBookmakers,
  getOutcomes,
} from "../api/api";
import { queryClient } from "../query";

export default function GameRow({ game, setBets, bets, subscription }) {
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

  const deleteMutation = useMutation(
      () => deleteGameSubscriber({ id: subscription.id }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["game_subscriber"] });
        },
      }
  );
  const createMutation = useMutation(
      () => createGameSubscriber({ game: game.id }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["game_subscriber"] });
        },
      }
  );

  return (
      <VStack padding="4" backgroundColor="white" rounded="lg">
        <Flex justify={"space-between"} w="full" alignItems={"center"}>
          <Text as="b">
            {home_team} - {away_team}
          </Text>
          <HStack padding={3}>
            {subscription ? (
                <IconButton
                    icon={<FaStar />}
                    colorScheme="teal"
                    onClick={() => deleteMutation.mutate()}
                />
            ) : (
                <IconButton
                    icon={<FaRegStar />}
                    colorScheme="teal"
                    onClick={() => createMutation.mutate()}
                />
            )}
            <Button colorScheme="teal">Ver jogo</Button>
          </HStack>
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