import Head from "next/head";
import Link from "next/link";
import { queryClient } from "../src/query";
import styles from "../styles/Home.module.css";
import Header from "../src/components/header";
import { getGames } from "../src/api/api";
import { Button, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: games } = useQuery({
    queryKey: ["games"],
    queryFn: () => getGames(),
  });
  const outcomes = null;

  return (
    <div className={styles.container}>
      <Head>
        <title>RASBet</title>
        <meta name="description" content="Best odds only with RASBet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <main>
        <Flex>
          <Flex direction="column" flex="1">
            {games ? (
              games.results.map(({ id, home_team, away_team }) => (
                <div key={id}>
                  {id}-{home_team} vs {away_team}
                </div>
              ))
            ) : (
              <p>No games</p>
            )}
          </Flex>
          <Flex direction="column" minW="200px">
            {outcomes ? (
              outcomes.map(({ id, name, multiplier }) => (
                <div key={id}>
                  {name} vs {multiplier}
                </div>
              ))
            ) : (
              <p>No bet</p>
            )}
            {outcomes && <Button>Submit bet</Button>}
          </Flex>
        </Flex>
      </main>

      <footer></footer>
    </div>
  );
}
