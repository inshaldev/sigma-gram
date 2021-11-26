import styles from '../styles/Posts.module.css';
import React from 'react';
import Image from 'next/image';
import { useData } from '../contexts/UserContext';
import { AiOutlineLike } from 'react-icons/ai';
import { PulseLoader } from 'react-spinners';

const Posts = () => {
  const { posts } = useData();
  return (
    <>
      <div className={styles.posts}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={styles.post}>
              <h1>{post.authorName}</h1>
              <p>{post.authorUsername}</p>
              <p>{post.content}</p>
              <Image src={post.imgURL} width={360} height={360} alt="image" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
