import styles from '../../styles/Settings.module.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useData } from '../../contexts/UserContext';

const Settings = () => {
  const { user } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });
  return <div className={styles.settings}></div>;
};

export default Settings;
