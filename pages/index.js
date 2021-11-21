import styles from '../styles/Home.module.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useData } from '../contexts/UserContext';
import Posts from '../components/Posts';

export default function Home() {
  const { user } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });
  return (
    <>
      <Head>
        <title>Sigmagram - Home</title>
      </Head>
      <main className={styles.home}>
        <Posts />
      </main>
    </>
  );
}
