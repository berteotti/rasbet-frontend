import { HStack, Button, Flex, VStack, Text, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBookmakers, getOutcomes } from "../api/api";
import { queryClient } from "../query";

export default function GameInfo({ game}) {
    const user = queryClient.getQueryData(["user"]);

    const { home_team, away_team } = game;
    const { data: bookmaker } = useQuery({
        queryKey: ["bookmaker", game.id],
        queryFn: () => getBookmakers({ game: game.id }),
        onSuccess: (data) =>
            queryClient.setQueryData(["bookmaker", game.id], data.results),
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
            {outcomes && outcomes.length && (
                <Flex w="full">
                    {outcomes.map(({ id, multiplier, result }) => (
                        <Flex justifyContent={"center"} key={id} flex="1">
                            <Button
            
                                colorScheme="teal"

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
