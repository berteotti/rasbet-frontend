import { Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { queryClient } from "../query";
import { useQuery } from "@tanstack/react-query";

export default function Header({ user }) {
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
        <Button as={Link} href="/profile">
          {user.username}
        </Button>
      )}
    </Flex>
  );
}
