import styles from '../styles/Login.module.css';
import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { auth } from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/dist/client/router';
import { PulseLoader } from 'react-spinners';

const Login = () => {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginAcc(e) {
    e.preventDefault();

    try {
      setLoginLoading(true);
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      router.push('/');
      setLoginLoading(false);
    } catch (err) {
      setLoginLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <Head>
        <title>Sigmagram - Log in to your account</title>
      </Head>
      <div className={styles.login} onSubmit={loginAcc}>
        <form className={styles.login_form}>
          <h1 className={styles.login_heading}>Log In</h1>
          <input
            className={styles.login_input}
            type="email"
            placeholder="Email address"
            ref={emailRef}
          />
          <input
            className={styles.login_input}
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button className={styles.login_btn}>
            {loginLoading ? <PulseLoader color={'#f5f5f5'} /> : 'Log In'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
