import styles from '../styles/Register.module.css';
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { db, auth } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { PulseLoader } from 'react-spinners';

const Register = () => {
  const router = useRouter();
  const [regLoading, setRegLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function regAcc(e) {
    e.preventDefault();
    setRegLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then(async (userCred) => {
        await setDoc(doc(db, 'users', userCred.user.uid), {
          realname: nameRef.current.value,
          username: emailRef.current.value.substring(
            0,
            emailRef.current.value.indexOf('@')
          ),
          amigos: 0,
          posts: 0,
        });
      });

      router.push('/');
      setRegLoading(false);
    } catch (err) {
      setRegLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>Sigmagram - Register an account</title>
      </Head>
      <div className={styles.reg} onSubmit={regAcc}>
        <form className={styles.reg_form}>
          <h1 className={styles.reg_heading}>Join the Club!</h1>
          <input
            className={styles.reg_input}
            type="text"
            placeholder="Name"
            ref={nameRef}
          />
          <input
            className={styles.reg_input}
            type="email"
            placeholder="Email address"
            ref={emailRef}
          />
          <input
            className={styles.reg_input}
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button type="submit" className={styles.reg_btn}>
            {regLoading ? <PulseLoader color={'#f5f5f5'} /> : 'Get Started'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
