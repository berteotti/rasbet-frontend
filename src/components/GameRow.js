import { HStack, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getBookmakers, getOutcomes } from "../api/api";
import { queryClient } from "../query";

export default function GameRow({ game }) {
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
    queryFn: useCallback(() => getOutcomes({ bookmaker: bookmaker.id }), [bookmaker]),
    enabled: Boolean(bookmaker?.id),
    onSuccess: (data) =>
      queryClient.setQueryData(["outcomes", bookmaker.id], data.results),
    onError: console.log,
  });

  return (
    <VStack padding="4" backgroundColor="white" rounded="lg">
      <Flex justify="space-between" alignItems="center">
        <Text fontWeight="bold">
          {home_team} - {away_team}
        </Text>
        <Link href={`/game/${game.id}`}>
          <Button colorScheme="teal">Ver jogo</Button>
        </Link>
      </Flex>
      {outcomes && outcomes.length && (
        <Flex w="full" justifyContent="space-between">
          {outcomes.map(({ id, multiplier, result }) => (
            <Button key={id} colorScheme="teal" >
              <HStack spacing={5}>
                <Text>{result}</Text>
                <Text>{multiplier}</Text>
              </HStack>
            </Button>
          ))}
        </Flex>
      )}
    </VStack>
  );
}

// Notes refactoring: In this refactored version, I wrapped the button to navigate to the game details with a Link component from next/link to
// handle the navigation, it will make the code cleaner and more readable. Also I replaced Text as="b" with Text fontWeight="bold" for
// accessibility reason and removed unnecessary Flex component
//inside the map function that makes the layout clean and more readable. Also added useCallback hook to avoid unnecessary re-renders