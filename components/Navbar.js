import styles from '../styles/Navbar.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '../contexts/UserContext';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase/firebase-config';
import { PulseLoader } from 'react-spinners';

export const Navbar = () => {
  const { userData } = useData();
  const [logOutLoading, setLogOutLoading] = useState(false);

  async function logOutAcc() {
    setLogOutLoading(true);
    setTimeout(async () => {
      try {
        await signOut(auth);
        setLogOutLoading(false);
      } catch (err) {
        setLogOutLoading(false);
        console.log(err);
      }
    }, 600);
  }
  return (
    <div className={styles.navbar}>
      {userData ? (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          {!logOutLoading ? (
            <li onClick={logOutAcc}>Sign Out</li>
          ) : (
            <li>
              <PulseLoader color={'#f5f5f5'} />
            </li>
          )}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};
