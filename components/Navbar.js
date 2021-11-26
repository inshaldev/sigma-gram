import styles from '../styles/Navbar.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '../contexts/UserContext';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase/firebase-config';
import { PulseLoader } from 'react-spinners';
import {
  IoHome,
  IoPerson,
  IoNotifications,
  IoSettingsSharp,
  IoAdd,
  IoAddCircle,
} from 'react-icons/io5';

export const Navbar = () => {
  const { userData } = useData();
  // const [logOutLoading, setLogOutLoading] = useState(false);

  // async function logOutAcc() {
  //   setLogOutLoading(true);
  //   setTimeout(async () => {
  //     try {
  //       await signOut(auth);
  //       setLogOutLoading(false);
  //     } catch (err) {
  //       setLogOutLoading(false);
  //       console.log(err);
  //     }
  //   }, 600);
  // }
  return (
    <ul className={styles.navbar}>
      <Link href="/" passHref>
        <li>
          <IoHome />
        </li>
      </Link>

      <Link href="/profile" passHref>
        <li>
          <IoPerson />
        </li>
      </Link>

      <Link href="/new" passHref>
        <li>
          <div className={styles.add_btn}>
            <IoAddCircle />
          </div>
        </li>
      </Link>

      <Link href="/notifications" passHref>
        <li>
          <IoNotifications />
        </li>
      </Link>

      <Link href="/settings" passHref>
        <li>
          <IoSettingsSharp />
        </li>
      </Link>
    </ul>
  );
};
// {
//   userData ? (
//     <ul>
//       <li>
//         <Link href="/">Home</Link>
//       </li>
//       <li>
//         <Link href="/profile">Profile</Link>
//       </li>
//       {/* {!logOutLoading ? (
//             <li onClick={logOutAcc}>Sign Out</li>
//           ) : (
//             <li>
//               <PulseLoader color={'#f5f5f5'} />
//             </li>
//           )} */}
//     </ul>
//   ) : (
//     ''
//   );
// }
