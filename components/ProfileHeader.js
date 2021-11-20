import styles from '../styles/Profile.module.css';
import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import { AiOutlineSetting } from 'react-icons/ai';

const ProfileHeader = () => {
  const { user } = useUserContext();
  const { firstname, lastname, username, posts, buddies, following } = user;
  const name = `${firstname} ${lastname}`;
  const logo = firstname.charAt(0) + lastname.charAt(0);
  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_user}>
        <h1 className={styles.profile_user_logo}>{logo}</h1>
        <div className={styles.profile_user_info}>
          <h1>{name}</h1>
          <p>{username}</p>
        </div>
        <AiOutlineSetting className={styles.profile_user_settings} />
      </div>
      <div className={styles.profile_user_buddies}>
        <p>buddies: {buddies}</p>
        <p>following: {following}</p>
        <p>posts: {posts}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
