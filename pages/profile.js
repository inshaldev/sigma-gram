import styles from '../styles/Profile.module.css';
import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePosts from '../components/ProfilePosts';

function Profile() {
  return (
    <div className={styles.profile}>
      <ProfileHeader />
      <ProfilePosts />
    </div>
  );
}

export default Profile;
