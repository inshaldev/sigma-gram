import styles from '../styles/Navbar.module.css';
import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>Sign Out</li>
      </ul>
    </div>
  );
};
