import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import displayPicture from '../public/Images/display-picture-inshaldev.jpg';
import { useData } from '../contexts/UserContext';
import { AiOutlineSetting } from 'react-icons/ai';
import {
  BounceLoader,
  MoonLoader,
  PuffLoader,
  PulseLoader,
  RotateLoader,
} from 'react-spinners';

const ProfileHeader = () => {
  const { user, userData } = useData();
  if (user) {
    const { realname, username, amigos, dpURL } = userData;
    username = `@${username}`;
    const posts = [];
    const Logo = realname.charAt(0);
  }
  return (
    <>
      <div className={styles.user}>
        <div className={styles.user_dp}>
          {!dpURL ? (
            <RotateLoader color={'#f5f5f5'} />
          ) : (
            <Image
              className={styles.user_dp_img}
              src={dpURL}
              alt={'display picture'}
              width={96}
              height={96}
            />
          )}
        </div>
        <div className={styles.user_info}>
          <h1>{realname}</h1>
          <p>{username}</p>
        </div>
      </div>
      <div className={styles.amigos}>
        <div className={styles.section}>
          <h1>{amigos}</h1>
          <p>amigos</p>
        </div>
        <div className={styles.section}>
          <h1>{posts.length}</h1>
          <p>posts</p>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
