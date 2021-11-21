import styles from '../styles/Profile.module.css';
import Link from 'next/link';
import { useData } from '../contexts/UserContext';
import { AiOutlineSetting } from 'react-icons/ai';

const ProfileHeader = () => {
  const { user, userData } = useData();
  if (user) {
    const { realname, username, posts, amigos } = userData;
    username = `@${username}`;
    const Logo = realname.charAt(0);
  }
  return (
    <>
      {user ? (
        <div className={styles.profile_header}>
          <div className={styles.profile_user}>
            <h1 className={styles.profile_user_logo}>{Logo}</h1>
            <div className={styles.profile_user_info}>
              <h1>{realname}</h1>
              <p>{username}</p>
            </div>
            <Link href="/profile/settings" passHref>
              <AiOutlineSetting className={styles.profile_user_settings} />
            </Link>
          </div>
          <div className={styles.profile_user_buddies}>
            {!amigos ? <p>No amigos, sadly.</p> : <p>Amigos: {amigos}</p>}
            {!posts ? '' : <p>Posts: {posts}</p>}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProfileHeader;
