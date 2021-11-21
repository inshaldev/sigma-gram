import styles from '../../styles/Profile.module.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useData } from '../../contexts/UserContext';
import ProfileHeader from '../../components/ProfileHeader';
import ProfilePosts from '../../components/ProfilePosts';

function Profile() {
  const { user, userData } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  });
  return (
    <>
      <Head>
        <title>Sigmagram - {userData?.realname}</title>
      </Head>
      <div className={styles.profile}>
        {userData ? (
          <>
            <ProfileHeader />
            <ProfilePosts />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default Profile;
