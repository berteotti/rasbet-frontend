import { Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { queryClient } from "../query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Header({ user }) {
    return (
        <Flex justify="space-between" alignItems={"center"}>
            <Link href="/">
                <Image src="/rasbet.svg" alt="rasbet" width={120} height={82} />
            </Link>
            {!user ? (
                <HStack>
                    <Button
                        as={Link}
                        href="/login"
                        colorScheme="teal"
                        textTransform="uppercase"
                    >
                        Entrar
                    </Button>
                    <Button
                        as={Link}
                        href="/register"
                        colorScheme="teal"
                        textTransform="uppercase"
                    >
                        Registar
                    </Button>
                </HStack>
            ) : (
                <HStack>
                    <Button
                        as={Link}
                        href="/events"
                        colorScheme="teal"
                        textTransform="uppercase"
                    >
                        Eventos
                    </Button>
                    <Button
                        as={Link}
                        href="/bets"
                        colorScheme="teal"
                        textTransform="uppercase"
                    >
                        Apostas
                    </Button>
                    <Button as={Link} href="/profile" colorScheme="teal">
                        {user.username}
                    </Button>
                </HStack>
            )}
        </Flex>
    );
}