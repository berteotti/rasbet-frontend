import { HStack, Button, Flex, VStack, Text, Box } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getBookmakers, getOutcomes, updateOutcome } from "../api/api";
import { queryClient } from "../query";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

const Outcomes = ({ bookmaker }) => {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newMultiplier, setMultiplier] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("");

  const changeMultiplier = (event) => setMultiplier(event.target.value);

  const { data: outcomes } = useQuery({
    queryKey: ["outcomes", bookmaker?.id],
    queryFn: () => getOutcomes({ bookmaker: bookmaker.id }),
    enabled: Boolean(bookmaker?.id),
    onSuccess: (data) =>
      queryClient.setQueryData(["outcomes", bookmaker.id], data.results),
    onError: console.log,
  });

  const mutation = useMutation(
    () => updateOutcome({ id: selectedOutcome, multiplier: newMultiplier }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["outcomes", bookmaker?.id]);
      },
    }
  );

  return (
    outcomes &&
    outcomes.length && (
      <Flex w="full">
        {outcomes.map(({ id, multiplier, result }) => (
          <Flex justifyContent={"center"} key={id} flex="1">
            {user?.is_staff ? (
              <div>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    setSelectedOutcome(id);
                    onOpen();
                  }}
                >
                  <HStack spacing={5}>
                    <div>{result}</div>
                    <div>{multiplier}</div>
                  </HStack>
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Alterar Odd</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <FormControl>
                      <InputGroup>
                        <Input
                          type="multiplier"
                          value={newMultiplier}
                          onChange={changeMultiplier}
                        />
                      </InputGroup>
                    </FormControl>
                    <ModalFooter>
                      <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Sair
                      </Button>
                      <Button
                        colorScheme="teal"
                        onClick={() => mutation.mutate()}
                      >
                        Gravar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              <div>
                <Button colorScheme="teal">
                  <HStack spacing={5}>
                    <div>{result}</div>
                    <div>{multiplier}</div>
                  </HStack>
                </Button>
              </div>
            )}
          </Flex>
        ))}
      </Flex>
    )
  );
};

export default function GameInfo({ game }) {
  const { home_team, away_team } = game;
  const { data: bookmakers } = useQuery({
    queryKey: ["bookmaker", game.id],
    queryFn: () => getBookmakers({ game: game.id, key: "" }),
    onSuccess: (data) =>
      queryClient.setQueryData(["bookmaker", game.id], data.results),
    onError: console.log,
  });

  return (
    <VStack padding="4" backgroundColor="white" rounded="lg">
      {bookmakers?.length > 0 &&
        bookmakers.map(({ id, multiplier, result }) => (
          <Outcomes bookmaker={{ id }} />
        ))}
    </VStack>
  );
}
