import styles from '../../styles/Settings.module.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useData } from '../../contexts/UserContext';

const Settings = () => {
  const { user, userData } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });
  return (
    <Head>
      <title>{userData?.realname} - Settings</title>
    </Head>
  );
};

export default Settings;
