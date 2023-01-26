import { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const getUruguayStreamers = async () => {
  try {
    const clientId = 'adnwt0mswhvgddgkjwhe6fs96zaxfn';
    const clientSecret = 'khotgt9vv1qln4wmxj4x7bs91vrxiy';
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const req = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    const access_token = req.data.access_token;
    // Utilizar el token para hacer solicitudes autorizadas a la API de Twitch

    const headers = {
      Authorization: 'Bearer ' + access_token,
      'Client-ID': clientId,
    };

    const url =
      'https://api.twitch.tv/helix/streams?country=UY&limit=1000&language=es';
    // Utilice una fecha de inicio de hace un año para obtener streamers activos en los últimos 365 días
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    const response = await axios.get(url, { headers });
    const streamers = response.data.data;
    // filtrar por fecha de inicio de transmisión
    const activeStreamers = streamers.filter((streamer) => {
      return new Date(streamer.started_at) >= startDate;
    });
    console.log(activeStreamers);

    // Remplace YOUR_CLIENT_ID con su propia clave de API de Twitch
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  useEffect(() => {
    getUruguayStreamers();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}
