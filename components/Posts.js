import styles from '../styles/Posts.module.css';
import React from 'react';
import { useData } from '../contexts/UserContext';
import { AiOutlineLike } from 'react-icons/ai';

const Posts = () => {
  const { posts } = useData();
  return (
    <div className={styles.posts}>
      {posts.map((post) => {
        return (
          <div className={styles.post} key={post.id}>
            <div className={styles.post_user}>
              {/* <h1 className={styles.post_user_logo}>{post.authorLogo}</h1> */}
              <div className={styles.post_user_info}>
                <h1>{post.authorName}</h1>
                <p>{`@${post.authorUsername}`}</p>
              </div>
            </div>
            <p className={styles.post_content}>{post.content}</p>
            <p className={styles.post_likes}>
              <span>
                <AiOutlineLike />
              </span>
              {post.likes}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
