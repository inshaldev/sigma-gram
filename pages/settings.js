import styles from '../styles/Settings.module.css';
import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useData } from '../contexts/UserContext';
import { PropagateLoader } from 'react-spinners';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { db } from '../firebase/firebase-config';
import { async } from '@firebase/util';

const Settings = () => {
  const { user, userData, setUserData } = useData();
  const router = useRouter();
  const realnameRef = useRef();
  const usernameRef = useRef();
  const bioRef = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });

  async function updateUserInfo() {
    const realname =
      realnameRef.current.value === ''
        ? userData.realname
        : realnameRef.current.value;
    const username =
      usernameRef.current.value === ''
        ? userData.username
        : usernameRef.current.value;
    const bio =
      bioRef.current.value === '' ? userData.bio : bioRef.current.value;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        realname: realname,
        username: username,
        bio: bio,
      }).then(async () => {
        const userDataDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDataDoc.data());
      });
      setError('Updated successfully!');
      realnameRef.current.value = '';
      usernameRef.current.value = '';
      bioRef.current.value = '';
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      {!userData ? (
        <PropagateLoader />
      ) : (
        <>
          <Head>
            <title>{userData?.realname} - Settings</title>
          </Head>
          <div className={styles.settings}>
            <form className={styles.settings_form}>
              <label className={styles.settings_form_label}>Name:</label>
              <input
                type="text"
                className={styles.settings_form_input}
                placeholder={userData?.realname}
                ref={realnameRef}
              />
              <label className={styles.settings_form_label}>Username:</label>
              <input
                type="text"
                className={styles.settings_form_input}
                placeholder={`@${userData?.username}`}
                ref={usernameRef}
              />
              <label className={styles.settings_form_label}>Bio:</label>
              <input
                type="text"
                className={styles.settings_form_input}
                placeholder={
                  !userData.bio ? 'Type your bio here to set it' : userData.bio
                }
                ref={bioRef}
              />
            </form>
            <div className={styles.settings_btn_div}>
              <p>{error}</p>
              <button onClick={updateUserInfo}>Update Information</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
