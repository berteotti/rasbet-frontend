import { Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { queryClient } from "../query";

export default function Header() {
  const user = queryClient.getQueryData(["user"]);

  return (
    <Flex justify="space-between">
      RASBET
      {!user ? (
        <HStack>
          <Button as={Link} href="/login">
            Entrar
          </Button>
          <Button as={Link} href="/register">
            Registar
          </Button>
        </HStack>
      ) : (
        <Flex>{user.results[0].first_name}</Flex>
      )}
    </Flex>
  );
}
