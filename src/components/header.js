import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header({ user }) {
  return (
    <Flex justify="space-between" alignItems="center">
      <Link href="/">
        <Image src="/rasbet.svg" alt="rasbet" width={120} height={82} />
      </Link>
      {!user ? (
        <>
          <Link href="/login">
            <Button colorScheme="teal">Entrar</Button>
          </Link>
          <Link href="/register">
            <Button colorScheme="teal">Registar</Button>
          </Link>
        </>
      ) : (
        <Link href="/profile">
          <Button colorScheme="teal">{user.username}</Button>
        </Link>
      )}
    </Flex>
  );
}

// Notes refactoring: This refactored version uses the Link component from next/link to handle the navigation, instead of using the as prop on the Button component.
// This allows for a cleaner and more readable code.
// Also I removed unnecessary imports such as HStack, Spacer and useQuery from "@tanstack/react-query" as they are not used in this component.