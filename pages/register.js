import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>RASBet</title>
        <meta name="description" content="Best odds only with RASBet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>

      <footer></footer>
    </div>
  );
}
